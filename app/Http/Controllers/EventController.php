<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request) {
        $event = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/events'), true);
        // dd($event);
        return Inertia::render('Event/Index', [
            'events' => $event,
            'routes' => $request->routes ?? [],
        ]);
    }

    // public function show(string $id) {
    //     $room = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/rooms/' . $id), true);

    //     return Inertia::render('Room/Show', [
    //         'room' => $room
    //     ]);
    // }
    
    public function changeStatus($id,Request $request){
        $url = env('API_URL') . '/events/' . $id;
        $res = Http::withHeaders(['Accept' => 'application/json'])
        ->withToken(session('token'))
        ->patch($url, [
            'status' => $request->status,
        ]);
        return json_decode($res);
    }

    public function store(Request $request) {
        return Http::withHeader('Accept','application/json')->withToken(session('token'))->post(env('API_URL') . '/events', [
            'name' => $request->name,
            'start_date' => $request->startdate,
            'end_date' => $request->enddate,
        ]);
    }

    public function save(Request $request, string $id) {
        $url = env('API_URL') . '/events/' . $id;
        // dd($url);
        $res = Http::withHeaders(['Accept' => 'application/json'])
        ->withToken(session('token'))
        ->put($url, [
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
        return json_decode($res);
    }

    public function destroy(string $id) {
        // http::withHeaders(['Accept','application/json'])
        return Http::withHeaders(['Accept => application/json'])
        ->withToken(session('token'))
        ->delete(env('API_URL') . '/events/' . $id);
    }
}
