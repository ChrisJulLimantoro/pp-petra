<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $redirect = ['student'];
        if (count(array_diff(session('roles'), $redirect)) > 0) {
            return redirect('/asisten');
        }
        $data = json_decode(Http::withToken(session('token'))->get(env('API_URL') . "/students-accepted/" . session('user_id')), true);
        $data = $data['data'] ?? [];
        $return['data'] = [];

        // dd($request->routes);
        foreach ($data as $x) {
            array_push($return['data'], [
                'hari' => $x['day'],
                'jam' => $x['time'],
                'mata_kuliah_praktikum' => $x['subject'],
                'kelas' => $x['code'],
                'ruangan' => $x['room']
            ]);
        }
        return Inertia::render('Mahasiswa/Dashboard', [
            'dataTable' => $return['data'],
            'routes' => $request->routes ?? [],
        ]);
    }
}
