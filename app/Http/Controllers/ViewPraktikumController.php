<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;

class ViewPraktikumController extends Controller
{
    public function index()
    {
        $data = json_decode(Http::withToken(session('token'))->get(env('API_URL') . "/students/" . session('user_id') . "/available-schedules/" . session('event_id')), true);
        $data = $data['data'];
        $return['data'] = [];
        foreach ($data as $x) {
            foreach ($x['practicums'] as $y) {
                if (is_array($y)) {
                    //CONVERT DAY
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
                    };

                    //CONVERT JAM
                    $endHour = $y['time'] + $y['duration'] * 100;
                    if (strlen($endHour) == "3") {
                        $endHour = substr($endHour, 0, 1) . ":" . substr($endHour, 1, 2);
                    } else if (strlen($endHour) == "4") {
                        $endHour = substr($endHour, 0, 2) . ":" . substr($endHour, 2, 3);
                    }
                    $startHour = $y['time'];
                    if (strlen($startHour) == "3") {
                        $startHour = substr($startHour, 0, 1) . ":" . substr($startHour, 1, 2);
                    } else if (strlen($startHour) == "4") {
                        $startHour = substr($startHour, 0, 2) . ":" . substr($startHour, 2, 3);
                    }


                    $time = $startHour . " - " . $endHour;

                    array_push($return['data'], [
                        'hari' => $day,
                        'jam' => $time,
                        'mata_kuliah_praktikum' => $y['name'],
                        'kelas' => $y['code'],
                        'lab' => $y['room']['name'],
                        'ruang' => $y['room']['code']
                    ]);
                }
            }
        }

        // dd($return['data']);
        return Inertia::render('Mahasiswa/viewKelas', [
            'dataTable' => $return['data']
        ]);
    }
}
