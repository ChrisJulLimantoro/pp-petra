<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function dashboard(Request $request) {
        $data = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/subjects-get-condition')
        )->data;

        $events = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/events')
        );
        $events = collect($events->data);
        $events = $events->filter(function($event) {
            return $event->status === 1;
        });

        $registrations = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/student-practicum-nico')
        )->data;

        return Inertia::render('Assistant/Dashboard', [
            'auth' => session('name'),
            'data' => $data,
            'events' => $events,
            'routes' => $request->routes ?? [],
            'registrations' => $registrations,
        ]);
    }

    public function detailApplication(Request $request) {
        $subjects = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/subjects')
        )->data;

        $events = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/events')
        );
        $events = collect($events->data);
        $events = $events->filter(function($event) {
            return $event->status === 1;
        });

        $initialReport = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/subjects-get-detailed-report/' . $subjects[0]->id . '/' . $events[0]->id)
        )->data;

        return Inertia::render('Assistant/DetailReport', [
            'title' => "Detail Pendaftaran",
            'subjects' => $subjects,
            'events' => $events,
            'initialReport' => $initialReport,
            'routes' => $request->routes ?? []
        ]);
    }

    public function getApplicationData($subject, $event) {
        $data = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/subjects-get-detailed-report/' . $subject . '/' . $event)
        )->data;

        return response()->json($data); 
    }

    public function historyApplication() {
        $data = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/student-practicum-nico')
        )->data;

        foreach($data as $d) {
            $d->name = $d->user->name;
            unset($d->user);
        }
    }
}
