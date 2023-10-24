<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PracticumController extends Controller
{
    public function viewPracticum(){
        $dataPracticum = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/practicums'), true);
        // dd($dataPracticum);
        return Inertia::render('Asisten/viewKelas', [
            'dataLowongan' => $dataPracticum
        ]);
    }
}
