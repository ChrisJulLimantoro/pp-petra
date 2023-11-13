<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class AssistantController extends Controller
{
    public function index()
    {
        $res = Http::withToken(session('token'))
            ->get(env('API_URL') . '/assistants');

        $assistants = $res->json('data');

        $props['assistants'] = $assistants;
        return Inertia::render('ManageAssistant', $props);
    }

    public function delete(Request $request)
    {
        $res = Http::withToken(session('token'))
            ->delete(env('API_URL') . '/assistants/' . $request->id);

        return response()->json($res->json());
    }

    public function store(Request $request) {
        $postData = [
            'name' => $request->name,
            'email' => $request->email,
        ];
        if ($request->room_id != '' | $request->room_id != null) {
            $postData['room_id'] = $request->room_id;
        }
        $res = Http::withToken(session('token'))
            ->post(env('API_URL') . '/assistants', $postData);
    
        return response()->json($res->json());  
    }

    public function getAssistantRoleId()
    {
        $res = Http::withToken(session('token'))
            ->get(env('API_URL') . '/roles');
        
        $roles = $res->json('data');

        $assistantRoleId = [];
        foreach ($roles as $role) {
            if ($role['slug'] == 'asdos' || $role['slug'] == 'astap') {
                $assistantRoleId[$role['slug']] = $role['id'];
            }
        }

        return response()->json($assistantRoleId);
    }

    public function getUser(Request $request, $nrp = '') {
        if ($nrp === '') {
            return response()->json([
                'id' => '',
                'name' => ''
            ]);
        }
        $res = Http::withToken(session('token'))
            ->get(env('API_URL') . '/users');

        $users = $res->json('data');
        try {
            $user = array_values(array_filter($users, function ($user) use ($nrp) {
                $userNrp = explode('@', $user['email'])[0];
                return strtolower($userNrp) == strtolower($nrp);
            }));
    
            return response()->json([
                'id' => $user[0]['id'],
                'name' => $user[0]['name']
            ]);
        } catch (Exception $e) {
            return response()->json([
                'id' => '',
                'name' => ''
            ]);
        }
    }

    public function getRooms() {
        $res = Http::withToken(session('token'))
            ->get(env('API_URL') . '/rooms');

        $rooms = $res->json('data');
        return response()->json($rooms);
    }

    public function updateUser(Request $request) {
        $res = Http::withToken(session('token'))
            ->patch(env('API_URL') . '/users/' . $request->id, [
                'name' => $request->name,
                'email' => $request->email
            ]);

        return response()->json($res->json());
    }

    public function updateRoom(Request $request) {
        $res = Http::withToken(session('token'))
            ->patch(env('API_URL') . '/assistants/' . $request->id, [
                'room_id' => $request->room_id,
            ]);

        return response()->json($res->json());
    }
}
