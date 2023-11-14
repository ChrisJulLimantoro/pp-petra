<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\AssignRoutesRequest;
use Illuminate\Http\Response;

class RBACController extends Controller
{
    public function getAllRoutes() {
        $routes = Route::getRoutes()->getRoutes();
        $routes = array_map(function ($route) {
            if(
                !preg_match("/_/",$route->uri) && !preg_match("/telescope/",$route->uri) && !preg_match('/rbac/', $route->uri) && !preg_match('/sanctum/', $route->uri) && !preg_match('/api/', $route->uri)
                ){
                return [
                    'uri' => $route->uri,
                    'method' => $route->methods[0],
                    'name' => $route->action['as'] ?? '',
                ];
            }
        }, $routes);
        $routes = array_filter($routes, function ($route) {
            return $route != null;
        });
        sort($routes);

        return $routes;
    }

    public function getAllViews(Request $request){
        return Inertia::render('RBAC/Views', [
            'routes' => $request->routes ?? [],
        ]);
    }

    public function manageRole(Request $request){
        $roles = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/roles'), true);

        return Inertia::render('RBAC/ManageRole', [
            'roles' => $roles,
            'routes' => $request->routes ?? [],
        ]);
    }

    public function addRole(Request $request) {
        $response = json_decode(
            Http::withToken(session('token'))->post(env('API_URL') . '/roles', [
                'name' => $request->name,
                'slug' => $request->slug,
            ])
        );

        return $response;
    }

    public function editRole(Request $request, $id) {
        $response = json_decode(
            Http::withToken(session('token'))->put(env('API_URL') . '/roles/' . $id, [
                'name' => $request->name,
                'slug' => $request->slug,
            ])
        );

        return $response;
    }

    public function deleteRole(string $id) {
        $response = json_decode(
            Http::withToken(session('token'))->delete(env('API_URL') . '/roles/' . $id)
        );

        return $response;
    }

    public function assignRoutesView(Request $request){
        $roles = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/roles'), true)['data'];
        // super admin auto all access
        foreach($roles as $role){
            if($role['slug'] != 'super-admin'){
                $data['roles']['data'][] = $role;
            }
        }
        $data['routes'] = $this->getAllRoutes();
        $data['userRoutes'] = $request->routes ?? [];

        return Inertia::render('RBAC/AssignRoutes', $data);
    }

    public function grantAccess(Request $request) {
        $response = json_decode(
            Http::withHeaders(['Accept'=> 'application/json'])->withToken(session('token'))->post(env('API_URL') . '/role-routes', [
                'role_id' => $request->role_id,
                'route' => $request->route,
                'method' => $request->method,
                'name' => $request->name,
            ])
        );

        return $response;
    }

    public function removeAccess(string $id) {
        $response = json_decode(
            Http::withToken(session('token'))->delete(env('API_URL') . '/role-routes/' . $id)
        );

        return $response;
    }

    public function assignRoleView(Request $request) {
        $response = Http::withToken(session('token'))
            ->get(sprintf('%s/users', env('API_URL')));
        $users = $response->json();

        $response = Http::withToken(session('token'))
            ->get(sprintf('%s/roles', env('API_URL')));
        $roles = $response->json();

        return Inertia::render(
            'RBAC/AssignRole', 
            ['users' => $users['data'], 'allRoles' => $roles['data'],'routes' => $request->routes ?? []]
        );
    }

    public function getUserRoles($user_id) {
        try {
            $response = Http::withToken(session('token'))
                ->get(sprintf('%s/users/%s', env('API_URL'), $user_id));
        }   
        catch (\Exception $e) {
            return response()->json(
                ['message' => $e->getMessage()], 
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
