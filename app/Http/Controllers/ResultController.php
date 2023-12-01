<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index(Request $request)
    {
        $props['routes'] = $request->routes ?? [];
        $props['events'] = Http::withToken(session('token'))
            ->get(env('API_URL') . '/events')->json('data');
        $props['subjects'] = Http::withToken(session('token'))
            ->get(env('API_URL') . '/subjects')->json('data');
        return Inertia::render('Result', $props);
    }

    public function resultByEvent($event_id)
    {
        $res = Http::withToken(session('token'))
            ->get(env('API_URL') . '/student-practicums/by-event/' . $event_id);
        $data = $res->json('data');

        $data = array_map(function ($result) {
            $result['generated'] = $result['accepted'] !== 0;
            return $result;
        }, $data);

        return response()->json($data);
    }

    public function generateResult($event_id, $subject_id) {
        $res = Http::withToken(session('token'))
            ->get(env('API_URL')   
                   . sprintf('/practicums-generate-result/%s/event/%s', $subject_id, $event_id));
        $data = $res->json();
        return response()->json($data);
    }

    public function updateEventGeneratedStatus($event_id) {
        $body = [
            'generated' => 1
        ];
        $res = Http::withToken(session('token'))
            ->patch(config('app')['API_URL'] . '/events/' . $event_id, $body);
        $data = $res->json('code');
        return response()->json(['code' => $data]);
    }

    public function assignStudent(Request $request) {
        $body = [
            'student_id' => $request->student_id,
            'practicum_id' => $request->practicum_id
        ];
        $res = Http::withToken(session('token'))
            ->post(config('app')['API_URL'] . '/student-practicums-manual', $body);
            
        $data = $res->json('code');
        return response()->json(['code' => $data]);
    }
}
