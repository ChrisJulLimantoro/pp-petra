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
        // dd($url);
        $data['subject'] = $subject['data'];
        // dd($data['subject']);
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
        $data['daftarPraktikum'] = [];
        $nama = [];
        $day = [];
        $class = [];
        $choice = [];
        $status = [];
        $time = [];
        foreach ($data['daftar'] as $x) {
            if ($x['student_id'] == session('user_id')) {
                $temp = $x['practicum'];
                $nama[] = $temp['name'];

                if ($temp['day'] == "1") {
                    $day[] = 'Senin';
                } elseif ($temp['day'] == "2") {
                    $day[] = 'Selasa';
                } elseif ($temp['day'] == "3") {
                    $day[] = ' Rabu';
                } elseif ($temp['day'] == "4") {
                    $day[] = 'Kamis';
                } elseif ($temp['day'] == "5") {
                    $day[] = 'Jumat';
                } elseif ($temp['day'] == "6") {
                    $day[] = 'Sabtu';
                };
                $class[] = $temp['code'];
                if ($x['choice'] == 1) {
                    $choice[] = "Pilihan 1";
                } else {
                    $choice[] = "Pilihan 2";
                }

                if ($x['accepted'] == 1) {
                    $status[] = "Diterima";
                } else {
                    $status[] = $x['rejected_reason'];
                }

                $endHour = $temp['time'] + 300;
                if (strlen($endHour) == "3") {
                    $endHour = substr($endHour, 0, 1) . ":" . substr($endHour, 1, 2);
                } else if (strlen($endHour) == "4") {
                    $endHour = substr($endHour, 0, 2) . ":" . substr($endHour, 2, 3);
                }
                $startHour = $temp['time'];
                if (strlen($startHour) == "3") {
                    $startHour = substr($startHour, 0, 1) . ":" . substr($startHour, 1, 2);
                } else if (strlen($endHour) == "4") {
                    $startHour = substr($startHour, 0, 2) . ":" . substr($startHour, 2, 3);
                }

                $time[] = $startHour . " - " . $endHour;
            }
        }
        $dataTable = [
            "Mata Kuliah Praktikum" => $nama,
            "Hari" => $day,
            "Kelas" => $class,
            "Pilihan" => $choice,
            "Status" => $status,
            "Jam" => $time
        ];

        return Inertia::render('Mahasiswa/DaftarPraktikum', [
            'matkul' => $data['matkul'],
            'id' => $data['id'],
            'dataTable' => $dataTable
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
        if (!(is_null($request->pilihan1) || is_null($request->pilihan2))) {
            if (is_null($request->pilihan2)) {
                $res = json_decode(Http::withHeader('Accept', 'application/json')->withToken(session('token'))->post(env('API_URL') . '/student-practicums', [
                    'student_id' => session('user_id'),
                    'practicum_id' => $request->pilihan1,
                    'event_id' => session('event_id'),
                    'choice' => '1'
                ]));
            } elseif (is_null($request->pilihan1)) {
                $res = json_decode(Http::withHeader('Accept', 'application/json')->withToken(session('token'))->post(env('API_URL') . '/student-practicums', [
                    'student_id' => session('user_id'),
                    'practicum_id' => $request->pilihan2,
                    'event_id' => session('event_id'),
                    'choice' => '2'
                ]));
            } else {
                $res = json_decode(Http::withHeader('Accept', 'application/json')->withToken(session('token'))->post(env('API_URL') . '/student-practicums-bulk',   
                ['data'=> [
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
                    ]]]
                )->getBody());
            }
        }
        return $res;
    }
}
