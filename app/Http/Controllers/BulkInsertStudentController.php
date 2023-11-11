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
                "semester" => $x['semester']
            ]);
        }
        // dd($return['data']);
        return Inertia::render('Assistant/viewMahasiswa');
    }
    public function insert(Request $request)
    {
        $prs = $request->file('file');
        
        $handle = fopen($prs,'r');
        if($handle !== false){
            $headers = fgetcsv($handle, 0, ';');
            foreach($headers as $h){
                $column[] = strtolower($h);
            }
            $save = [];
            if(!(in_array('nim',$column))){
                return redirect()->back()->with('error','there is no NIM or NRP in the file');
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
                            $save[$data[$nrp_index]]['prs'] = json_encode([$data[array_search($h,$column)]]);
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
                            $decode = json_decode($save[$data[$nrp_index]]['prs']);
                            $decode[] = $data[array_search($h,$column)];
                            $save[$data[$nrp_index]]['prs'] = json_encode($decode);
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
}
