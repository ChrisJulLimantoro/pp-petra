<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class RBACRoleAssignmentController extends Controller
{
    public function assignRoleView() {
        $response = Http::withToken(session('token'))
            ->get(sprintf('%s/users', env('API_URL')));
        $users = $response->json();

        $response = Http::withToken(session('token'))
            ->get(sprintf('%s/roles', env('API_URL')));
        $roles = $response->json();

        return Inertia::render(
            'RBAC/AssignRole', 
            ['users' => $users['data'], 'allRoles' => $roles['data']]
        );
    }

    public function getUserRoles($user_id) {
        try {
            $response = Http::withToken(session('token'))
                ->get(sprintf('%s/users/%s', env('API_URL'), $user_id));
        }   
        catch (\Exception $e) {
            return response()->json(
                ['message' => 'Error retrieving user roles!'], 
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        $data = $response->json();
        return response()->json($data['data']['roles']);
    }

    public function assignRole($user_id, $role_id) {
        try {
            $response = Http::withToken(session('token'))
                ->post(sprintf('%s/user-roles/%s', env('API_URL'), $user_id), [
                    'role_id' => $role_id,
                ]);
        }
        catch (\Exception $e) {
            return response()->json(
                ['message' => 'Role assignment failed!'], 
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        return response()->json(
            ['message' => 'Role assigned successfully!'],
            Response::HTTP_OK
        );
    }

    public function unassignRole($user_id, $role_id) {
        try {
            $response = Http::withToken(session('token'))
                ->delete(
                    sprintf(
                        '%s/users/%s/roles/%s', 
                        env('API_URL'),
                        $user_id,
                        $role_id
                    )
                );
        } 
        catch (\Exception $e) {
            return response()->json(
                ['message' => $e->getMessage()], 
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        return response()->json(
            ['message' => 'Role unassigned successfully!'],
            Response::HTTP_OK
        );
    }
}
