<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;


class BulkInsertStudentController extends Controller
{

    public function index(Request $request){
        $data = json_decode(Http::withToken(session('token'))->get(env('API_URL') . "/students"), true);
        $data = $data['data'];
        // dd($data);
        $return['data'] = [];
        foreach($data as $x){
            if($x['program']=="i"){
                $prodi= "Informatika";
            }else if($x['program']=="s"){
                $prodi= "Sistem Informasi Bisnis";
            }else{
                $prodi= "Data Science and Analytics";
            }
            array_push($return['data'],[
                "nrp" => substr($x['user']['email'],0,9),
                "nama" => $x['user']['name'],
                "program_studi" => $prodi,
                "ipk" => $x['ipk'],
                "ips" => $x['ips'],
                "semester" => $x['semester'],
                "id_student"=> $x['user_id']
            ]);
        }
        // dd($return['data']);
        return Inertia::render('Assistant/viewMahasiswa',[
            "dataTable" => $return['data'],
            'routes' => $request->routes ?? [],
        ]);
    }
    public function insert(Request $request)
    {
        $prs = $request->file('file');
        
        if($prs->getClientOriginalExtension() != 'csv'){
            return response()->json(['success' => false,'data' => 'File must be in .csv format']);
        }
        $handle = fopen($prs,'r');
        if($handle !== false){
            $headers = fgetcsv($handle, 0, ';');
            foreach($headers as $h){
                $h = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $h);
                $column[] = strtolower($h);
            }
            $save = [];
            if(!(in_array('nim',$column))){
                return response()->json(['success'=>false,'data' => 'there is no NIM or NRP in the file']);
            }
            $nrp_index = array_search('nim',$column);

            while (($data = fgetcsv($handle, 0, ';')) !== false) {
                $exist = true;
                if(!isset($save[$data[$nrp_index]])){
                    $exist = false;
                }
                foreach($column as $h){
                    if(!$exist){
                        if($h == 'kodemk'){
                            $save[$data[$nrp_index]]['prs'] = [['code' => $data[array_search($h,$column)], 'class' => $data[array_search('kelasmk',$column)]]];
                        }else if($h == 'nim'){
                            $save[$data[$nrp_index]]['email'] = strtolower($data[array_search($h,$column)]).'@john.petra.ac.id';
                        }else if($h == 'nama'){
                            $save[$data[$nrp_index]]['name'] = $data[array_search($h,$column)];
                        }else if($h == 'periode'){
                            $tahunMasuk  = intval('20'.substr($data[$nrp_index],3,2));
                            $tahunNow = intval(substr($data[array_search($h,$column)],0,4));
                            $sem = substr($data[array_search($h,$column)],5,1) == 1 ? ($tahunNow - $tahunMasuk)*2 + 1 : ($tahunNow - $tahunMasuk)*2 + 2;
                            $save[$data[$nrp_index]]['semester'] = $sem;
                            $save[$data[$nrp_index]][$h] = $data[array_search($h,$column)];
                        }else if($h == 'ipk' || $h == 'ips'){
                            $save[$data[$nrp_index]][$h] = str_replace(",",".",$data[array_search($h,$column)]);
                        }
                            $save[$data[$nrp_index]]['program'] = 'i';
                        
                    }else{
                        if($h == 'kodemk'){
                            $decode = $save[$data[$nrp_index]]['prs'];
                            $decode[] = ['code' => $data[array_search($h,$column)], 'class' => $data[array_search('kelasmk',$column)]];
                            $save[$data[$nrp_index]]['prs'] = $decode;
                        }else{
                            continue;
                        }
                    }
                }
            }
            fclose($handle);
            // dd($save);
            $response = Http::withHeaders(['Accept' => 'application/json'])->withToken(session('token'))->post(env('API_URL').'/students-bulk',['data'=>$save]);
            $response = json_decode($response,true);
            // dd($response);
            if($response['success']){
                return response()->json(['success' => true,'data' => $response['data']]);
            }else{
                return response()->json(['success' => false,'data' => $response['message']]);
            }
        }else{
            return response()->json(['success' => false,'data' => 'hello']);
        }
    }
    public function insertSchedule(Request $request)
    {
        $schedule = $request->file('file');
        $handle = fopen($schedule,'r');
        if($handle !== false){
            $headers = [];
            while(($data = fgetcsv($handle,0,';'))!== false){
                if(strtolower($data[0]) != 'hari') continue;
                else {
                    $headers = $data;
                    break;
                }
            }
            if($headers == []){
                return response()->json(['success' => false,'data' => 'File is not in the correct format']);
            }
            foreach($headers as $h){
                $h = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $h);
                $column[] = strtolower($h);
            }
            $save = [];
            $day = "";
            $i = 0;
            while(($data = fgetcsv($handle,0,';')) !== false){
                if($data[array_search('hari',$column)] != ""){
                    if(strtolower($data[array_search('hari',$column)]) == 'senin'){
                        $day = 1;
                    }else if(strtolower($data[array_search('hari',$column)]) == 'selasa'){
                        $day = 2;
                    }else if(strtolower($data[array_search('hari',$column)]) == 'rabu'){
                        $day = 3;
                    }else if(strtolower($data[array_search('hari',$column)]) == 'kamis'){
                        $day = 4;
                    }else if(strtolower($data[array_search('hari',$column)]) == 'jumat'){
                        $day = 5;
                    }else if(strtolower($data[array_search('hari',$column)]) == 'sabtu'){
                        $day = 6;
                    }else if(strtolower($data[array_search('hari',$column)]) == 'minggu'){
                        $day = 7;
                    }else{
                        $day = "";
                    }
                }
                if($day == "") continue;
                if($data[1] == "") continue;
                if($data[2] == "") continue;
                if($data[4] == "") continue;
                if($data[3] == "") continue;
                $save[$i] = [];
                $save[$i]['day'] = $day;
                foreach($column as $h){
                    if($h == 'novak'){
                        $save[$i]['code'] = $data[array_search($h,$column)];
                    }else if($h == 'jam'){
                        $time = explode(':', $data[array_search($h,$column)]);
                        $time = intval($time[0].$time[1]);
                        $save[$i]['time'] = $time;
                        $duration = explode(':', $data[array_search('sampai',$column)]);
                        $duration = intval($duration[0].$duration[1]);
                        $duration = ($duration - $time)/100;
                        $save[$i]['duration'] = $duration;
                    }else if($h == 'kls'){
                        $save[$i]['class'] = $data[array_search($h,$column)];
                    }else if($h == 'nama'){
                        $save[$i]['name'] = $data[array_search($h,$column)];
                    }else{
                        continue;
                    }
                }
                $i++;
                // dd($save);
            }
            // dd($save);
            $response = Http::withHeaders(['Accept' => 'application/json'])->withToken(session('token'))->post(env('API_URL').'/master-schedules-bulk',['data'=>$save]);
            $response = json_decode($response,true);
            // dd($response);
            if($response['success']){
                return response()->json(['success' => true,'data' => $response['data']]);
            }else{
                return response()->json(['success' => false,'data' => $response['message']]);
            }
        }
    }

    public function delete(string $idStudent)
    {
        $response = json_decode(
            Http::withToken(session('token'))->delete(env('API_URL') . '/students/' . $idStudent)
        );

        return $response;
    }

    public function viewPrs($student_id,Request $request)
    {
        $prs = json_decode(Http::withHeader('Accept','application/json')
        ->withToken(session('token'))
        ->get(config('app')['API_URL'] . "/students/$student_id/prs"),true)['data'];

        $master = json_decode(Http::withHeader('Accept','application/json')
        ->withToken(session('token'))
        ->get(config('app')['API_URL']."/master-schedules-get-format"),true)['data'];
        // dd($master);
        $schedules = [];
        foreach($master as $m){
            if(!key_exists($m['kode'],$schedules)){
                $schedules[$m['kode']] = [
                    'code' => $m['kode'],
                    'name' => $m['mata_kuliah'],
                    'schedules' => []
                ];
            }
            $schedules[$m['kode']]['schedules'][] = [
                'day' => $m['hari'],
                'time' => $m['jam'],
                'class' => $m['kelas']
            ];
        }
        $schedules = array_values($schedules);

        $days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        $times = [730, 830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, 1730, 1830, 1930, 2030];

        $schedule = [];
        // create template Schedule
        foreach ($times as $time) {
            $schedule[$time] = [];
            foreach ($days as $day) {
                $schedule[$time][$day] = null;
            }
        }

        foreach($prs['prs'] as $pr){
            if($pr['day'] == 1){
                $day = 'SENIN';
            }else if($pr['day'] == 2){
                $day = 'SELASA';
            }else if($pr['day'] == 3){
                $day = 'RABU';
            }else if($pr['day'] == 4){
                $day = 'KAMIS';
            }else if($pr['day'] == 5){
                $day = 'JUMAT';
            }else if($pr['day'] == 6){
                $day = 'SABTU';
            }else{
                $day = 'MINGGU';
            }
            $schedule[$pr['time']][$day] = ['code' => $pr['code'],'class' => $pr['class'],'name' => $pr['name'],'duration' => $pr['duration']];
            for($i=1; $i < $pr['duration']; $i++){
                $schedule[$pr['time'] + 100*$i][$day] = 'merged';
            }
        }
        // dd($schedules);
        return Inertia::render('Assistant/viewPrs', [
            'prs' => $schedule,
            'studentId' => $student_id,
            'name' => $prs['name'],
            'nrp' => $prs['nrp'],
            'routes' => $request->routes ?? [],
            'schedules' => $schedules
        ]);
    }

    public function addPrs(Request $request){
        $res = Http::withHeaders(['Accept' => 'application/json'])
        ->withToken(session('token'))
        ->post(env('API_URL')."/students-insert-prs",$request->only(['student_id','code','class']));
        $res = json_decode($res,true);
        // dd($res);
        if(isset($res['success']) && $res['success']){
            return response()->json(['success' => true,'data' => $res['data']]);
        }else{
            return response()->json(['success' => false,'data' => $res['error_message']]);
        }
    }

    public function deletePrs($student,$idPRS)
    {
        $code = explode('-',$idPRS)[0];
        $class = explode('-',$idPRS)[1];
        // dd($code,$class);
        $res = Http::withHeaders(['Accept' => 'application/json'])->withToken(session('token'))->post(env('API_URL')."/students-delete-prs",[
            'student_id' => $student,
            'code' => $code,
            'class' => $class
        ]);

        // $res = json_decode($res,true);
        // dd($res);
        return redirect()->back()->with('message','Berhasil menghapus PRS!');
    }

    public function myPrs(Request $request)
    {
        if(session('user_id') != null){
            $student_id = session('user_id');
        }
        $prs = json_decode(Http::withHeader('Accept','application/json')
        ->withToken(session('token'))
        ->get(config('app')['API_URL'] . "/students/$student_id/prs"),true);

        if(!$prs['success']){
            return redirect()->to(route('Dashboard'))->with('message','Anda belum mengambil PRS!');
        }else{
            $prs = $prs['data'];
        }

        $master = json_decode(Http::withHeader('Accept','application/json')
        ->withToken(session('token'))
        ->get(config('app')['API_URL']."/master-schedules-get-format"),true)['data'];
        // dd($master);
        $schedules = [];
        foreach($master as $m){
            if(!key_exists($m['kode'],$schedules)){
                $schedules[$m['kode']] = [
                    'code' => $m['kode'],
                    'name' => $m['mata_kuliah'],
                    'schedules' => []
                ];
            }
            $schedules[$m['kode']]['schedules'][] = [
                'day' => $m['hari'],
                'time' => $m['jam'],
                'class' => $m['kelas']
            ];
        }
        $schedules = array_values($schedules);

        $days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        $times = [730, 830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, 1730, 1830, 1930, 2030];

        $schedule = [];
        // create template Schedule
        foreach ($times as $time) {
            $schedule[$time] = [];
            foreach ($days as $day) {
                $schedule[$time][$day] = null;
            }
        }

        foreach($prs['prs'] as $pr){
            if($pr['day'] == 1){
                $day = 'SENIN';
            }else if($pr['day'] == 2){
                $day = 'SELASA';
            }else if($pr['day'] == 3){
                $day = 'RABU';
            }else if($pr['day'] == 4){
                $day = 'KAMIS';
            }else if($pr['day'] == 5){
                $day = 'JUMAT';
            }else if($pr['day'] == 6){
                $day = 'SABTU';
            }else{
                $day = 'MINGGU';
            }
            $schedule[$pr['time']][$day] = ['code' => $pr['code'],'class' => $pr['class'],'name' => $pr['name'],'duration' => $pr['duration']];
            for($i=1; $i < $pr['duration']; $i++){
                $schedule[$pr['time'] + 100*$i][$day] = 'merged';
            }
        }
        // dd($schedules);
        return Inertia::render('Assistant/viewPrs', [
            'prs' => $schedule,
            'studentId' => $student_id,
            'name' => $prs['name'],
            'nrp' => $prs['nrp'],
            'routes' => $request->routes ?? [],
            'schedules' => $schedules,
            'viewOnly' => in_array('student', session('roles')) ? true : false,
        ]);
    }
}
