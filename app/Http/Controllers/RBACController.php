<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class RBACController extends Controller
{
    public function getAllRoutes() {
        $routes = Route::getRoutes()->getRoutes();
        $routes = array_map(function ($route) {
            if(!preg_match("/_/",$route->uri) && !preg_match("/telescope/",$route->uri)){
                return [
                    'uri' => $route->uri,
                    'methods' => $route->methods[0],
                ];
            }
        }, $routes);
        $routes = array_filter($routes, function ($route) {
            return $route != null;
        });
        return $routes;
    }
    public function getAllViews(){
        return Inertia::render('RBAC/Views');
    }
    public function addRole(){
        return Inertia::render('RBAC/AddRole');
    }
}
