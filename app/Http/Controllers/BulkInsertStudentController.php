<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;


class BulkInsertStudentController extends Controller
{

    public function index(){
        $data = json_decode(Http::withToken(session('token'))->get(env('API_URL') . "/students/"), true);
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
            "dataTable" => $return['data']
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
                foreach($headers as $h){
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
                        }else if($h == 'ipk' || $h == 'ips'){
                            $save[$data[$nrp_index]][$h] = $data[array_search($h,$column)];
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
            if($response['success']){
                return response()->json(['success' => true,'data' => $save]);
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
                return response()->json(['success' => true,'data' => $save]);
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
}
