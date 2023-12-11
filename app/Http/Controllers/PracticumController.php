<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Ramsey\Collection\Set;

class PracticumController extends Controller
{

    public function index(Request $request)
    {
        $res = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . '/rooms-practicums');
        $data = $res->json('data');

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $times = [730, 830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, 1730, 1830];

        $practicums = [];
        foreach ($days as $day) {
            $practicums[$day] = [];
            foreach ($times as $time) {
                $practicums[$day][$time] = [];
                foreach ($data as $room) {
                    $practicums[$day][$time][$room['name']] = null;
                }
            }
        }

        $subjects = new Set('array');
        $rooms = [];
        foreach ($data as $room) {
            $rooms[$room['id']] = [
                'name' => $room['name'],
                'capacity' => $room['capacity'],
            ];
            foreach ($room['practicums'] as $practicum) {
                $day = $days[$practicum['day'] - 1];
                $duration = $practicum['subject']['duration'];
                $time = $practicum['time'];
                $roomName = $room['name'];
                $practicums[$day][$time][$roomName] = [
                    'id' => $practicum['id'],
                    'name' => $practicum['name'],
                    'code' => $practicum['code'],
                    'quota' => $practicum['quota'],
                    'subject_id' => $practicum['subject_id'],
                    'subject_name' => $practicum['subject']['name'],
                    'duration' => $duration,
                    'room_id' => $room['id'],
                    'time' => $time,
                    'day' => $practicum['day'],
                ];
                for ($i = 1; $i < $duration; $i++) {
                    $time = $practicum['time'] + $i * 100;
                    $practicums[$day][$time][$room['name']] = 'merged';
                }

                $subjects->add([
                    'id' => $practicum['subject_id'],
                    'name' => $practicum['subject']['name'],
                ]);
            }
        }

        $props['subjects'] = $subjects->toArray();
        $props['rooms'] = $rooms;
        $props['practicums'] = $practicums;
        $props['routes'] = $request->routes ?? [];

        // dd($props);
        return Inertia::render('Assistant/Practicum', $props);
    }

    public function store(Request $request)
    {
        $name = null;
        $subject_id = null;
        if ($request->subject != null && $request->subject != '') {
            $subject = explode('|', $request->subject);
            $subject_id = $subject[0];
            $name = sprintf('Praktikum %s', $subject[1]);
        }

        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ])->withToken(session('token'))
            ->post(env('API_URL') . '/practicums', [
                'name' => $name,
                'code' => $request->code,
                'quota' => $request->quota,
                'room_id' => $request->room,
                'day' => $request->day,
                'time' => $request->time,
                'subject_id' => $subject_id,
            ]);
        return response()->json($res->json(), $res->status());
    }

    public function update(Request $request, $id)
    {
        $name = null;
        $subject_id = null;
        if ($request->subject != null && $request->subject != '') {
            $subject = explode('|', $request->subject);
            $request->subject_id = $subject[0];
            $request->name = sprintf('Praktikum %s', $subject[1]);
        }

        $res = Http::withheaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ])->withToken(session('token'))
            ->patch(env('API_URL') . '/practicums/' . $id, [
                'name' => $request->name,
                'code' => $request->code,
                'quota' => $request->quota,
                'room_id' => $request->room,
                'day' => $request->day,
                'time' => $request->time,
                'subject_id' => $request->subject_id,
            ]);

        return response()->json($res->json(), $res->status());
    }

    public function destroy($id)
    {
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ])->withToken(session('token'))
            ->delete(env('API_URL') . '/practicums/' . $id);

        return redirect()->back()->with('message', $res->json());
    }

    public function getClassDetails(Request $request, $id)
    {
        $res = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . '/practicums' . '/' . $id);

        $data = $res->json('data');

        return Inertia::render('Assistant/DetailKelas', ['data' => $data, 'routes' => $request->routes ?? []]);
    }

    public function getMovePraktikumDetails(Request $request, $id, $type, $student_assistant_practicum_id)
    {
        if ($type == 'Asisten') {
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->get(config('app')['API_URL'] . '/assistant-practicums' . '/' . $student_assistant_practicum_id);

            $data = $res->json('data');

            $res2 = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->get(config('app')['API_URL'] . '/subjects' . '/' . $data['practicum']['subject_id']);

            $data2 = $res2->json('data');
        } elseif ($type == 'Mahasiswa') {
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->get(config('app')['API_URL'] . '/student-practicums' . '/' . $student_assistant_practicum_id);

            $data = $res->json('data');

            $res2 = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->get(config('app')['API_URL'] . '/subjects' . '/' . $data['practicum']['subject_id']);

            $data2 = $res2->json('data');
        }

        return Inertia::render('Assistant/Move', ['id' => $id, 'type' => $type, 'data' => $data, 'data2' => $data2, 'routes' => $request->routes ?? []]);
    }

    public function viewAddAssistant(Request $request, $id)
    {
        $res = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . '/practicums' . '/' . $id);

        $data = $res->json('data');

        $res2 = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . '/assistants');

        $data2 = $res2->json('data');

        return Inertia::render('Assistant/AddAssistant', ['data' => $data, 'data2' => $data2, 'id' => $id, 'routes' => $request->routes ?? []]);
    }

    public function viewAddStudent(Request $request, $id)
    {
        $res = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . '/practicums' . '/' . $id);

        $data = $res->json('data');

        return Inertia::render('Assistant/AddMahasiswa', ['data' => $data, 'id' => $id, 'routes' => $request->routes ?? []]);
    }

    public function viewPracticum(Request $request)
    {
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $dataPracticum = json_decode(Http::withToken(session('token'))->get(env('API_URL') . '/practicum-karen'), true);
        // dd($dataPracticum);
        $data = [];

        foreach ($dataPracticum['data'] as $dp) {

            $parts = explode("-", $dp['time']);

            $startHour = substr_replace($parts[0], '.', -2, 0);
            $endHour = substr_replace($parts[1], '.', -2, 0);

            $time = $startHour . " - " . $endHour;

            $data[] = [
                "hari" => $days[$dp['day'] - 1],
                "jam" => $time,
                "mata_kuliah_praktikum" => $dp['name'],
                "kelas" => $dp['code'],
                "jumlah_asisten" => $dp['assistants'],
                "kuota" => $dp['quota'],
            ];
        }

        $dataA = array_slice($data, 0, 1);
        $dataL = array_slice($data, 1);

        // dd($dataA);
        return Inertia::render('Asisten/viewKelas', [
            'dataLowongan' => $dataL,
            'dataAjar' => $dataA,
            'routes' => $request->routes ?? []
        ]);
    }

    public function deleteMhsAsistenPraktikum(Request $request)
    {
        $type = $request->type;
        $student_assistant_practicum_id = $request->student_assistant_practicum_id;

        if ($type == 'Asisten') {
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->delete(config('app')['API_URL'] . '/assistant-practicums' . '/' . $student_assistant_practicum_id);
        } elseif ($type == 'Mahasiswa') {
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->delete(config('app')['API_URL'] . '/student-practicums' . '/' . $student_assistant_practicum_id);
        }

        $success = $res["success"];
        if ($success) {
            $data = [
                'success' => true,
                'message' => 'Berhasil Menghapus!',
            ];
        } else {
            $data = [
                'success' => false,
                'message' => 'Gagal menghapus!',
            ];
        }

        return response()->json($data, 201);
    }

    public function insertAssistantPracticum(Request $request)
    {
        $slot_used = $request->slot_used;
        $total_slot = $request->total_slot;

        if ($slot_used < $total_slot) {
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->post(config('app')['API_URL'] . '/assistant-practicums', [
                    'assistant_id' => $request->assistant_id,
                    'practicum_id' => $request->practicum_id,
                ]);
            $success = $res["success"];

            if ($success) {
                $data = [
                    'success' => true,
                    'message' => 'Berhasil menambahkan asisten praktikum!',
                ];
            } else {
                $data = [
                    'success' => false,
                    'message' => 'Gagal menambahkan asisten praktikum!',
                ];
            }
        } else {

            $data = [
                'success' => false,
                'message' => 'Kuota sudah penuh!',
            ];
        }

        return response()->json($data, 201);
    }

    public function ajaxDetailStudent(Request $request, $nrp)
    {

        $res = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . "/students-nrp/" . $nrp);

        $data = $res->json('data');
        return response()->json($data, 201);
    }

    public function insertStudentPracticum(Request $request)
    {
        $students = json_decode($request->data, true);
        $practicum_id = $request->practicum_id;

        if (!$students) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada mahasiswa yang ditambahkan!',
            ], 201);
        }

        $validation = Http::withHeader('Accept', 'application/json')
            ->withToken(session('token'))
            ->get(config('app')['API_URL'] . "/practicums/" . $practicum_id);

        $valid = $validation->json('data');

        # check apakah mahasiswa sudah terdaftar pada kelas praktikum
        foreach ($valid["student_practicum"] as $val) {
            foreach ($students as $student) {
                if ($val["student_id"] == $student["id"]) {
                    return response()->json([
                        'success' => false,
                        'message' => $val["student"]["user"]["name"] . ' sudah terdaftar pada kelas praktikum!',
                    ], 201);
                }
            }
        }

        # check apakah slot sudah full
        $slot_used = $valid["student_practicum"];
        $slot_used = count($slot_used);
        if ($slot_used >= $valid["quota"]) {
            return response()->json([
                'success' => false,
                'message' => 'Kuota sudah penuh!',
            ], 201);
        }

        # insert mahasiswa ke kelas praktikum
        foreach ($students as $student) {
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->post(config('app')['API_URL'] . '/student-practicums-manual', [
                    'student_id' => $student['id'],
                    'practicum_id' => $practicum_id,
                ]);
        }

        $success = $res["success"];

        if ($success) {
            $data = [
                'success' => true,
                'message' => 'Berhasil menambahkan mahasiswa praktikum!',
            ];
        } else {
            $data = [
                'success' => false,
                'message' => 'Gagal menambahkan mahasiswa praktikum!',
            ];
        }

        return response()->json($data, 201);
    }

    public function moveStudentAsistantPracticum(Request $request)
    {
        $target_practicum_id = $request->target_practicum_id;
        $type = $request->tipe;
        $student_assistant_id = $request->student_assistant_id;
        $student_assistant_practicum_id = $request->student_assistant_practicum_id;

        if ($type == 'Asisten') {
            # check apakah asisten sudah terdaftar pada kelas praktikum
            $validation = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->get(config('app')['API_URL'] . "/practicums/" . $target_practicum_id);

            $valid = $validation->json('data');

            foreach ($valid["assistant_practicum"] as $val) {
                if ($val["assistant_id"] == $student_assistant_id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Asisten sudah terdaftar pada kelas praktikum tersebut!',
                    ], 201);
                }
            }

            # check apakah slot sudah full
            $slot_used = $valid["assistant_practicum"];
            $slot_used = count($slot_used);
            if ($slot_used >= floor($valid["quota"] / 8)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kuota sudah penuh!',
                ], 201);
            }

            #delete asisten dari kelas praktikum
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->delete(config('app')['API_URL'] . '/assistant-practicums' . '/' . $student_assistant_practicum_id);

            $success = $res["success"];
            if ($success) {
                #insert asisten ke kelas praktikum
                $res = Http::withHeader('Accept', 'application/json')
                    ->withToken(session('token'))
                    ->post(config('app')['API_URL'] . '/assistant-practicums', [
                        'assistant_id' => $student_assistant_id,
                        'practicum_id' => $target_practicum_id,
                    ]);

                $success = $res["success"];
            }
        } elseif ($type == 'Mahasiswa') {

            # check apakah mahasiswa sudah terdaftar pada kelas praktikum
            $validation = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->get(config('app')['API_URL'] . "/practicums/" . $target_practicum_id);

            $valid = $validation->json('data');

            foreach ($valid["student_practicum"] as $val) {
                if ($val["student_id"] == $student_assistant_id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Mahasiswa sudah terdaftar pada kelas praktikum tersebut!',
                    ], 201);
                }
            }

            # check apakah slot sudah full
            $slot_used = $valid["student_practicum"];
            $slot_used = count($slot_used);
            if ($slot_used >= $valid["quota"]) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kuota sudah penuh!',
                ], 201);
            }

            #delete mahasiswa dari kelas praktikum
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->delete(config('app')['API_URL'] . '/student-practicums' . '/' . $student_assistant_practicum_id);

            #insert mahasiswa ke kelas praktikum
            $res = Http::withHeader('Accept', 'application/json')
                ->withToken(session('token'))
                ->post(config('app')['API_URL'] . '/student-practicums-manual', [
                    'student_id' => $student_assistant_id,
                    'practicum_id' => $target_practicum_id,
                ]);

            $success = $res["success"];
        }

        if ($success) {
            $data = [
                'success' => true,
                'message' => 'Berhasil Memindah!',
            ];
        } else {
            $data = [
                'success' => false,
                'message' => 'Gagal Memindah!',
            ];
        }

        return response()->json($data, 201);
    }
}
