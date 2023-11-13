<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;

class DaftarPraktikumController extends Controller
{
    public function getSubject()
    {
        $url = env('API_URL') . "/students/" . session('user_id') . "/available-schedules/" . session('event_id');
        // dd($url);
        $subject = Http::withHeader('Accept', 'application/json')->withToken(session('token'))->get($url);
        
        $subject = json_decode($subject->getBody(), true);
    //    dd($subject)
        $data['subject'] = $subject['data'];
        $matkul = [];
        $id = [];
        foreach ($data['subject'] as $x) {
            foreach ($x['practicums'] as $y) {
                if (is_array($y)) {
                    if (!in_array($y['name'], $matkul)) {
                        $matkul[] = $y['name'];
                        $id[] = $y['subject_id'];
                    }
                }
            };
        }
        $data['matkul'] = $matkul;
        $data['id'] = $id;
        $url = env('API_URL') . "/student-practicums";
        $daftar = Http::withHeader('Accept', 'application/json')->withToken(session('token'))->get($url);
        $daftar = json_decode($daftar->getBody(), true);
        $data['daftar'] = $daftar['data'];
        $dataTable = [];
        $pracID=[];
        $status='';
        foreach ($data['daftar'] as $x) {
            if ($x['student_id'] == session('user_id')) {
                $pracID[]= $x['id'];

                if ($x['practicum']['day'] == "1") {
                    $day = 'Senin';
                } elseif ($x['practicum']['day'] == "2") {
                    $day = 'Selasa';
                } elseif ($x['practicum']['day'] == "3") {
                    $day = ' Rabu';
                } elseif ($x['practicum']['day'] == "4") {
                    $day = 'Kamis';
                } elseif ($x['practicum']['day'] == "5") {
                    $day = 'Jumat';
                } elseif ($x['practicum']['day'] == "6") {
                    $day = 'Sabtu';
                };
                if ($x['choice'] == 1) {
                    $choice = "Pilihan 1";
                } else {
                    $choice = "Pilihan 2";
                }

                if ($x['accepted'] == 0) {
                    $status = "Pending..";
                } elseif($x['accepted'] == 1) {
                    $status = "Terima Pilihan 1";
                }elseif($x['accepted'] == 2) {
                    $status = "Tolak Pilihan 1";
                }elseif($x['accepted'] == 3) {
                    $status = "Terima Pilihan 2";
                }else{
                    $status = "Tolak Pilihan 2";
                }

                $endHour = strval($x['practicum']['time'] + 300);
                if (strlen($endHour) == "3") {
                    $endHour = substr($endHour, 0, 1) . ":" . substr($endHour, 1, 2);
                } else if (strlen($endHour) == "4") {
                    $endHour = substr($endHour, 0, 2) . ":" . substr($endHour, 2, 3);
                }
                $startHour = strval($x['practicum']['time']);
                if (strlen($startHour) == "3") {
                    $startHour= strval($startHour);
                    $startHour = substr($startHour, 0, 1) . ":" . substr($startHour, 1, 2);
                } else if (strlen($startHour) == "4") {
                    $startHour= strval($startHour);
                    $startHour = strval(substr($startHour, 0, 2) . ":" . substr($startHour, 2, 3));
                }


                $time = $startHour . " - " . $endHour;
                if(session('is_validate')){
                    array_push($dataTable, [
                        'hari' => $day,
                        'jam' => $time,
                        'mata_kuliah_praktikum' => $x['practicum']['name'],
                        'kelas' => $x['practicum']['code'],
                        'pilihan' => $choice,
                        'status' => $status
                    ]);
                }else{
                    array_push($dataTable, [
                        'hari' => $day,
                        'jam' => $time,
                        'mata_kuliah_praktikum' => $x['practicum']['name'],
                        'kelas' => $x['practicum']['code'],
                        'pilihan' => $choice
                    ]);
                }
            }
        }

        return Inertia::render('Mahasiswa/DaftarPraktikum', [
            'matkul' => $data['matkul'],
            'id' => $data['id'],
            'dataTable' => $dataTable,
            'practicumID' => $pracID,
            'ValidateStatus' => session('is_validate'),
            'Event' => session('event_name')
        ]);
    }

    public function getClass($course)
    {
        $res = Http::withHeader('Accept', 'application/json')->withToken(session('token'))->get(config('app')['API_URL'] . "/students/" . session('user_id') . "/available-schedules/" . session('event_id'));
        $class = $res->json('data');
        $data['class'] = $class;
        $get = [];
        $practicum = [];
        foreach ($data['class'] as $x) {
            $practicum = $x['practicums'];
            foreach ($practicum as $y) {
                if (is_array($y)) {
                    if (strtolower($y['subject_id']) == strtolower($course)) {
                        $pracID[] = $y['id'];
                        if ($y['day'] == "1") {
                            $day = 'Senin';
                        } elseif ($y['day'] == "2") {
                            $day = 'Selasa';
                        } elseif ($y['day'] == "3") {
                            $day = ' Rabu';
                        } elseif ($y['day'] == "4") {
                            $day = 'Kamis';
                        } elseif ($y['day'] == "5") {
                            $day = 'Jumat';
                        } elseif ($y['day'] == "6") {
                            $day = 'Sabtu';
                        }

                        if (strlen($y['time']) == "3") {
                            $time = substr($y['time'], 0, 1) . ":" . substr($y['time'], 1, 2);
                        } else if (strlen($y['time']) == "4") {
                            $time = substr($y['time'], 0, 2) . ":" . substr($y['time'], 2, 3);
                        }
                        $get[] = $y['code'] . " --> " . $day . "(" . $time . ")";
                    }
                }
            }
        }
        $data['pracID'] = $pracID;
        return response()->json([
            'class1' => $get,
            'class2' => $get,
            'practicumID' => $data['pracID']
        ]);
    }

    public function addClass(Request $request)
    {
            if (empty($request->pilihan2)) {
                $res = json_decode(Http::withHeader('Accept', 'application/json')->withToken(session('token'))->post(env('API_URL') . '/student-practicums', [
                    'student_id' => session('user_id'),
                    'practicum_id' => $request->pilihan1,
                    'event_id' => session('event_id'),
                    'choice' => '1'
                ]));
            } elseif (empty($request->pilihan1)) {
                $res = json_decode(Http::withHeader('Accept', 'application/json')->withToken(session('token'))->post(env('API_URL') . '/student-practicums', [
                    'student_id' => session('user_id'),
                    'practicum_id' => $request->pilihan2,
                    'event_id' => session('event_id'),
                    'choice' => '2'
                ]));
            } else {
                $res = json_decode(Http::withHeader('Accept', 'application/json')->withToken(session('token'))->post(
                    env('API_URL') . '/student-practicums-bulk',
                    ['data' => [
                        [
                            'student_id' => session('user_id'),
                            'practicum_id' => $request->pilihan1,
                            'event_id' => session('event_id'),
                            'choice' => '1'
                        ],
                        [
                            'student_id' => session('user_id'),
                            'practicum_id' => $request->pilihan2,
                            'event_id' => session('event_id'),
                            'choice' => '2'
                        ]
                    ]]
                )->getBody());
            }
        return $res;
    }

    public function deletePracticum(string $idPracticum)
    {
        $response = json_decode(
            Http::withToken(session('token'))->delete(env('API_URL') . '/student-practicums/' . $idPracticum)
        );

        return $response;
    }

    public function valid(){
        $response= json_decode(
            Http::withHeader('Accept', 'application/json')->withToken(session('token'))->post(env('API_URL'). '/validate/' . session('user_id'). "/event/" . session('event_id'))->getBody());
        if($response->success){
            session(['is_validate' => true]);
        }
        return $response;
    }
}
