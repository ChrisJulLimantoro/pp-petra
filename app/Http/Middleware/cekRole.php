<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class cekRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $name = $request->route()->getName();
        $method = $request->getMethod();
        if(in_array('super-admin',session('roles'))){
            $request->routes = 'all';
            return $next($request);
        }
        $cek = json_decode(Http::withToken(session('token'))->post(env('API_URL') . '/rbac/cek-role', ['route' => $name, 'method' => $method, 'user_id' => session('user_id')]));
        if ($cek->data) {
            if ($method === 'GET') {
                $routes = json_decode(Http::withToken(session('token'))->get(env('API_URL').'/rbac/get-routes/' . session('user_id')))->data;
                $request->routes = $routes;
            }
            return $next($request);
        }else{
            return redirect()->to(route('dashboard'))->with('error', 'You are not authorized to access this page');
        }
    }
}
