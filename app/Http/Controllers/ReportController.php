<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function dashboard() {
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
            'registrations' => $registrations,
        ]);
    }

    public function detailReport() {
        $subjects = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/subjects')
        )->data;

        $initialReport = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/subjects-get-unapplied/' . $subjects[0]->id)
        )->data;

        foreach($initialReport as $r) {
            $r->name = $r->user->name;
            unset($r->user);
        }

        return Inertia::render('Assistant/DetailReport', [
            'title' => "Detailed Report",
            'subjects' => $subjects,
            'initialReport' => $initialReport,
        ]);
    }

    public function getReportData($id) {
        $data = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
            ->withToken(session('token'))
            ->get(env('API_URL') . '/subjects-get-unapplied/' . $id)
        )->data;

        foreach($data as $d) {
            $d->name = $d->user->name;
            unset($d->user);
        }

        return response()->json($data); 
    }
}
