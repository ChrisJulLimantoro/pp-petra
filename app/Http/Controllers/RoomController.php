<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index() {
        $rooms = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/rooms'), true);

        return Inertia::render('Room/Index', [
            'rooms' => $rooms
        ]);
    }

    // public function show(string $id) {
    //     $room = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/rooms/' . $id), true);

    //     return Inertia::render('Room/Show', [
    //         'room' => $room
    //     ]);
    // }

    public function store(Request $request) {
        return Http::withToken(session('token'))->post(env('API_URL') . '/rooms', [
            'name' => $request->name,
            'code' => $request->code,
            'capacity' => $request->capacity,
        ]);
    }

    public function save(Request $request, string $id) {
        $url = env('API_URL') . '/rooms/' . $id;
        // dd($url);
        $res = Http::withHeaders(['Accept' => 'application/json'])
        ->withToken(session('token'))
        ->put($url, [
            'name' => $request->name,
            'code' => $request->code,
            'capacity' => $request->capacity,
        ]);
        return json_decode($res);
    }

    public function destroy(string $id) {
        // http::withHeaders(['Accept','application/json'])
        return json_decode(Http::withHeaders(['Accept => application/json'])->withToken(session('token'))->delete(env('API_URL') . '/rooms/' . $id));
    }
}
