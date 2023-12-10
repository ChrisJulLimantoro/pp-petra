<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;

class JadwalController extends Controller
{
    public function index(Request $request){
        $data = json_decode(Http::withToken(session('token'))->get(env('API_URL') . "/master-schedules/"), true);
        $data = $data['data'];
        // dd($data);
        $result=[];
        foreach($data as $x){
            if($x['day']==1){
                $day="Senin";
            }else if($x['day']==2){
                $day="Selasa";
            }else if($x['day']==3){
                $day="Rabu";
            }else if($x['day']==4){
                $day="Kamis";
            }else if($x['day']==5){
                $day="Jumat";
            }else if($x['day']==6){
                $day="Sabtu";
            };

            $endHour = strval($x['time'] + $x['duration']*100);
                if (strlen($endHour) == "3") {
                    $endHour = substr($endHour, 0, 1) . ":" . substr($endHour, 1, 2);
                } else if (strlen($endHour) == "4") {
                    $endHour = substr($endHour, 0, 2) . ":" . substr($endHour, 2, 3);
                }
            $startHour = strval($x['time']);
            if (strlen($startHour) == "3") {
                $startHour= strval($startHour);
                $startHour = substr($startHour, 0, 1) . ":" . substr($startHour, 1, 2);
            } else if (strlen($startHour) == "4") {
                $startHour= strval($startHour);
                $startHour = strval(substr($startHour, 0, 2) . ":" . substr($startHour, 2, 3));
            }


            $time = $startHour . " - " . $endHour;

            array_push($result,[
                "kode" => $x['code'],
                "mata_kuliah" => $x['name'],
                "kelas" => $x['class'],
                "hari" => $day,
                "jam" => $time,
                "id" => $x['id']
            ]);
        }
        return Inertia::render('Assistant/viewMasterJadwal', [
            'dataTable' => $result,
            'routes' => $request->routes ?? [],
        ]);
    }

    public function insert(Request $request){

        // kodeMatkul: formData.kodeMataKuliah,
        // namaMatkul: formData.namaMataKuliah,
        // kelas: formData.kelas,
        // hari: parseInt(formData.hari),
        // jamMulai: parseInt(formData.jamMulai.replace(':', ''), 10),
        // durasi: parseInt(formData.durasi)
        $res = json_decode(Http::withHeader('Accept', 'application/json')->withToken(session('token'))->post(env('API_URL') . '/master-schedules', [
            'code' => $request->kodeMatkul,
            'day' => $request->hari,
            'time' => $request->jamMulai,
            'duration' => $request->durasi,
            'name'=> $request->namaMatkul,
            'class' => $request->kelas
        ])->getBody());
        // dd($res);
        return $res;
    }

    public function delete(string $deleteID){
        $response = json_decode(
            Http::withToken(session('token'))->delete(env('API_URL') . '/master-schedules/' . $deleteID)
        );

        return $response;
    }

    public function update(string $id, Request $request){
        // dd($request->durasi);
        $url = env('API_URL') . '/master-schedules/' . $id;
        $res = Http::withHeaders(['Accept' => 'application/json', 'Content-Type' => 'application/json'])
        ->withToken(session('token'))
        ->patch($url, [
            'code' => $request->kodeMatkul,
            'day' => $request->hari,
            'time' => $request->jamMulai,
            'duration' => $request->durasi,
            'name'=> $request->namaMatkul,
            'class'=> $request->kelas
        ])->getBody();
        // dd($res);
        return $res;
    }
}
