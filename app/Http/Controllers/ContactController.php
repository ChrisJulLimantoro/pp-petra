<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;

class ContactController extends Controller
{
    public function index(Request $request){
        $response = Http::withToken(session('token'))
        ->withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ])->get(config('app')['API_URL'].'/contacts');
        $contacts = json_decode($response,true);
        
        return Inertia::render('Contact/Index', [
            'contacts' => $contacts,
            'routes' => $request->routes ?? []
        ]);
    }

    public function store(Request $request){
        $data = $request->only(['phone','type']);
        $response = Http::withToken(session('token'))
        ->withHeader('Accept','application/json')
        ->post(config('app')['API_URL'].'/contacts',$data);
        $contact = json_decode($response,true);

        return response()->json($contact);
    }

    public function update(Request $request, $id){
        $data = $request->only(['phone','type']);
        $response = Http::withToken(session('token'))
        ->withHeader('Accept','application/json')
        ->patch(config('app')['API_URL'].'/contacts/'.$id,$data);
        $contact = json_decode($response,true);

        return response()->json($contact);
    }

    public function destroy($id){
        // dd("hahahha");
        $response = Http::withToken(session('token'))
        ->withHeader('Accept','application/json')
        ->delete(config('app')['API_URL'].'/contacts/'.$id);
        $contact = json_decode($response,true);
        // dd($contact);
        return response()->json($contact);
    }
}
