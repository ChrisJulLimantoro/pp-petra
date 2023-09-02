<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\AssignRoutesRequest;

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
    public function getAllViews(){
        return Inertia::render('RBAC/Views');
    }
    public function addRole(){
        return Inertia::render('RBAC/AddRole');
    }

    public function assignRoutesView(){
        $data['roles'] = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/roles'), true);
        $data['routes'] = $this->getAllRoutes();

        return Inertia::render('RBAC/AssignRoutes', $data);
    }

    public function grantAccess(Request $request) {
        $response = json_decode(
            Http::withToken(session('token'))->post(env('API_URL') . '/role-routes', [
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
}
