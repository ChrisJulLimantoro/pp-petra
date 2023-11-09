<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PracticumController extends Controller
{

    public function index()
    {
        $res = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . '/subjects');
        
        $data = $res->json('data');


        $times = [730, 830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, 1730, 1830];
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $subjects = [];
        foreach ($data as $subject) {
            array_push($subjects, [
                'id' => $subject['id'],
                'name' => $subject['name'],
            ]);
        }

        $table = [];
        foreach ($days as $day) {
            foreach ($times as $time) {
                foreach ($subjects as $subject) {
                    $table[$day][$time][$subject['name']] = null;
                }
            }
        }

        foreach ($data as $subject) {
            foreach ($subject['practicums'] as $practicum) {
                $table[$days[$practicum['day'] - 1]][$practicum['time']][$subject['name']] = [
                    'id' => $practicum['id'],
                    'name' => sprintf('%s (%s)', $practicum['name'], $practicum['code']),
                    'subject_name' => $subject['name'],
                    'subject_id' => $subject['id'],
                    'code' => $practicum['code'],
                    'quota' => $practicum['quota'],
                    'room_id' => $practicum['room_id'],
                    'day' => $practicum['day'],
                    'time' => $practicum['time'],
                    'duration' => $subject['duration']
                ];
                for ($i = 1; $i < $subject['duration']; $i++) {
                    $table[$days[$practicum['day'] - 1]][$practicum['time'] + $i * 100][$subject['name']] = 'merged';
                }
            }
        }
        $props['data'] = $table;
        $props['subjects'] = $subjects;

        $res = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . '/rooms');
        $data = $res->json('data');

        $rooms = [];
        foreach ($data as $room) {
            $rooms[$room['id']]['name'] = $room['name'];
            $rooms[$room['id']]['capacity'] = $room['capacity'];
        }
        $props['rooms'] = $rooms;

        return Inertia::render('Assistant/Practicum', $props);
    }

    public function store(Request $request)
    {
        $name = null;
        $subject_id = null;
        if ($request->subject != null && $request->subject != '') {
            $subject = explode('|', $request->subject);
            $subject_id = $subject[0];
            $name = sprintf('Praktikum %s', $subject[1]);
        }

        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'        
        ])->withToken(session('token'))
            ->post(env('API_URL') . '/practicums', [
                'name' => $name,
                'code' => $request->code,
                'quota' => $request->quota,
                'room_id' => $request->room,
                'day' => $request->day,
                'time' => $request->time,
                'subject_id' => $subject_id,
            ]);
        return response()->json($res->json(), $res->status());
    }

    public function update(Request $request, $id) {
        $name = null;
        $subject_id = null;
        if ($request->subject != null && $request->subject != '') {
            $subject = explode('|', $request->subject);
            $request->subject_id = $subject[0];
            $request->name = sprintf('Praktikum %s', $subject[1]);
        }

        $res = Http::withheaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ])->withToken(session('token'))
            ->patch(env('API_URL') . '/practicums/' . $id, [
                'name' => $request->name,
                'code' => $request->code,
                'quota' => $request->quota,
                'room_id' => $request->room,
                'day' => $request->day,
                'time' => $request->time,
                'subject_id' => $request->subject_id,
            ]); 

        return response()->json($res->json(), $res->status());
    }

    public function destroy($id) {
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'        
        ])->withToken(session('token'))
            ->delete(env('API_URL') . '/practicums/' . $id);

        return redirect()->back()->with('message', $res->json());
    }

    public function viewPracticum(){
        $dataPracticum = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/practicums'), true);
        // dd($dataPracticum);
        return Inertia::render('Asisten/viewKelas', [
            'dataLowongan' => $dataPracticum
        ]);

    }
}
