<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class cekRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $access): Response
    {
        foreach(explode(",",$access) as $role){
            if(in_array($role, $request->session()->get('roles'))){
                return $next($request);
            }
        }
        return redirect()->to(route('dashboard'))->with('error', 'You are not authorized to access this page');
    }
}
