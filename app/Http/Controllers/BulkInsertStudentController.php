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
        $prs = $request->file('prs');
        
        $handle = fopen($prs,'r');
        if($handle !== false){
            $headers = fgetcsv($handle, 0, ',');
            foreach($headers as $h){
                $column[] = $h;
            }
            $save = [];
            while (($data = fgetcsv($handle, 0, ',')) !== false) {
                for($i=0;$i<count($column);$i++){
                    $save[$column[$i]] = $data[$i];
                }
            }
        }
        dd($save);
    }
}
