<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Ramsey\Collection\Set;

class PracticumController extends Controller
{
    public function index()
    {
        $res = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . '/rooms-practicums');
        $data = $res->json('data');

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $times = [730, 830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, 1730, 1830];

        $practicums = [];
        foreach ($days as $day) {
            $practicums[$day] = [];
            foreach ($times as $time) {
                $practicums[$day][$time] = [];
                foreach ($data as $room) {
                    $practicums[$day][$time][$room['name']] = null;
                }
            }
        }

        $subjects = new Set('array');
        $rooms = [];
        foreach ($data as $room) {
            $rooms[$room['id']] = [
                'name' => $room['name'],
                'capacity' => $room['capacity'],
            ];
            foreach ($room['practicums'] as $practicum) {
                $day = $days[$practicum['day'] - 1];
                $duration = $practicum['subject']['duration'];
                $time = $practicum['time'];
                $roomName = $room['name'];
                $practicums[$day][$time][$roomName] = [
                    'id' => $practicum['id'],
                    'name' => $practicum['name'],
                    'code' => $practicum['code'],
                    'quota' => $practicum['quota'],
                    'subject_id' => $practicum['subject_id'],
                    'subject_name' => $practicum['subject']['name'],
                    'duration' => $duration,
                    'room_id' => $room['id'],
                    'time' => $time,
                    'day' => $practicum['day'],
                ];
                for ($i = 1; $i < $duration; $i++) {
                    $time = $practicum['time'] + $i * 100;
                    $practicums[$day][$time][$room['name']] = 'merged';
                }

                $subjects->add([
                    'id' => $practicum['subject_id'],
                    'name' => $practicum['subject']['name'],
                ]);
            }
        }

        $props['subjects'] = $subjects->toArray();
        $props['rooms'] = $rooms;
        $props['practicums'] = $practicums;

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
}
