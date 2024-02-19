<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class activeEvent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $activeEvent = json_decode(
            Http::withHeaders(['Accept' => 'application/json'])
                ->withToken(session('token'))
                ->get(env('API_URL') . '/events')
        );
        $activeEvent = collect($activeEvent->data);
        $activeEvent = $activeEvent->filter(function ($event) {
            return $event->status == 1;
        });

        if ($activeEvent->isEmpty()) {
            return redirect()->route('Dashboard');
        }

        return $next($request);
    }
}
