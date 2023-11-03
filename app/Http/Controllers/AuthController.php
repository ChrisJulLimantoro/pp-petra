<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google_Client;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class AuthController extends Controller
{
    private $googleClient;
    public function __construct()
    {
        $this->googleClient = new Google_Client();

        $this->googleClient->setClientId(env('GOOGLE_CLIENT_ID'));
        $this->googleClient->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $this->googleClient->setRedirectUri(url("/processLogin"));
        $this->googleClient->addScope("email");
        $this->googleClient->addScope("profile");
    }
    function loginView(Request $request)
    {
        $data['link'] = $this->googleClient->createAuthUrl();
        $data['status'] = session('error');
        // $data['error'] = session('error') == null ? false : true;
        return Inertia::render('Auth/Login', $data);
    }

    function login(Request $request)
    {
        if ($request->getScheme() == 'http') {
            if (!isset($request->code)) {
                return redirect()->to("/login")->with('error', "Error Authentication!!");
            }
            $token = $this->googleClient->fetchAccessTokenWithAuthCode($request->code);
            $payload = $this->googleClient->verifyIdToken($token['id_token']);
            // dd($payload);
            if ($payload) {
                // dd($payload['email']);
                //check petra mail
                if (isset($payload['hd']) && str_ends_with($payload['hd'], "petra.ac.id")) {
                    //set session  
                    $request->session()->put('email', $payload['email']);
                    $request->session()->put('name', $payload['name']);
                    // session untuk mahasiswa tanpa nrp maka dosen dan admin
                    if (str_ends_with($payload['hd'], "john.petra.ac.id")) {
                        $request->session()->put('nrp', substr($payload['email'], 0, 9));
                    }
                    // get laravel sanctum token from API
                    $url = env('API_URL') . "/login";
                    $response = Http::post($url, [
                        'email' => $payload['email'],
                        'password' => env('API_SECRET')
                    ]);
                    $res = json_decode($response);
                    // dd($res);
                    if (!$res->success) {
                        $request->session()->flush();
                        return redirect()->to("/login")->with('error', "Not Registered, please contact admin!!");
                    }
                    $request->session()->put('token', $res->data->token);
                    $request->session()->put('user_id', $res->data->id);
                    $request->session()->put('event_id', $res->data->event_id);
                    $request->session()->put('event_name', $res->data->event_name);
                    return  redirect()->to(route('Dashboard'));
                    // return;

                } else {
                    // echo 'gagal salah email, bkn email petra';
                    return redirect()->to("/login")->with('error', "Please Use Your @john.petra.ac.id email");
                }
            } else {
                // Invalid ID token
            }
            return;
        }

        if ($request->g_csrf_token   != null) {
            // valid CSRF token
            // Handle the error here

            \Firebase\JWT\JWT::$leeway = 60;

            do {
                $attempt = 0;
                try {
                    //get the cretential from post sent by google
                    $id_token = $request->credential;

                    //verify the idtoken to convert to the data
                    $payload = $this->googleClient->verifyIdToken($id_token);

                    if ($payload) {
                        // dd($payload);

                        //check petra mail
                        if (isset($payload['hd']) && $payload['hd'] == "petra.ac.id") {
                            //set session  

                            //with ajax
                            session()->put('email', $payload['email']);
                            echo 'berhasil';
                            // return;


                        } else {
                            echo 'gagal salah email, bbkn email petra';
                            // return redirect()->to("/login")->with('error', "Please Use Your @john.petra.ac.id email");
                        }
                    } else {
                        // Invalid ID token
                    }

                    $retry = false;
                } catch (\Firebase\JWT\BeforeValidException $e) {
                    $attempt++;
                    $retry = $attempt < 2;
                }
            } while ($retry);
        } else {
            return redirect()->to("/login")->with('error', "Error CSRF");
        }
    }
    function logout(Request $request)
    {
        $request->session()->flush();
        return redirect()->to("/");
    }
}
