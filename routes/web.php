<?php

use App\Http\Controllers\AssistantController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DaftarPraktikum;
use App\Http\Controllers\DaftarPraktikumController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PracticumController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ViewPraktikumController;
use App\Http\Controllers\RBACController;
use App\Http\Controllers\RBACRoleAssignmentController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BulkInsertStudentController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\ResultController;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Sidebar
Route::middleware('cekRole')-> group(function() {
    Route::get('/mahasiswa', [DashboardController::class, 'index'])->name('Dashboard');
    Route::get('/asisten', [ReportController::class, 'dashboard'])->name('asisten.dashboard');
    Route::get("/mahasiswa/manage-mahasiswa", [BulkInsertStudentController::class, 'index'])->name('Mahasiswa.Manage Mahasiswa');
    Route::get("/mahasiswa/viewJadwal", [JadwalController::class, 'index'])->name('Mahasiswa.View Jadwal');
    Route::get('/praktikum/daftarPraktikum', [DaftarPraktikumController::class, 'getSubject'])->name('Praktikum.Daftar Praktikum');
    Route::get('/praktikum/viewKelas', [ViewPraktikumController::class, 'index'])->name('Praktikum.View Kelas Praktikum');
    Route::get('/praktikum/manage-praktikum', [PracticumController::class, 'index'])->name('Praktikum.Manage Praktikum');
    Route::get('/asisten/viewAjar', [PracticumController::class, 'viewPracticum'])->name('Asisten.View Jadwal Ajar');
    Route::get('/asisten/manage-asisten', [AssistantController::class, 'index'])->name('Asisten.Manage Asisten');
    Route::get('/result', [ResultController::class, 'index'])->name('Result');
    Route::get('/room', [RoomController::class, 'index'])->name('Ruangan');
    Route::get('/event', [EventController::class, 'index'])->name('Event');
    Route::get('/rbac/manageRole', [RBACController::class, 'manageRole'])->name('RBAC.Manage Role');
    Route::get('/rbac/assignRole', [RBACController::class, 'assignRoleView'])->name('RBAC.Add User to Role');
    Route::get('/rbac/assignRoutes', [RBACController::class, 'assignRoutesView'])->name('RBAC.Add Routes to Role');

    Route::get("/viewPRS/{student_id}", [BulkInsertStudentController::class, 'viewPrs'])->name('viewPRS');
    Route::post("/uploadMahasiswa", [BulkInsertStudentController::class, 'insert'])->name('uploadMahasiswa');
    Route::post('/uploadSchedule',[BulkInsertStudentController::class, 'insertSchedule'])->name('uploadSchedule');
    Route::delete("/deleteMahasiswa/{idStudent}", [BulkInsertStudentController::class, 'delete'])->name('deleteMahasiswa');

    Route::post("/addMasterJadwal", [JadwalController::class, 'insert'])->name('addMasterJadwal');
    Route::delete("/deleteMasterJadwal/{deleteID}", [JadwalController::class, 'delete'])->name('deleteMasterJadwal');
    Route::patch("/update/{id}", [JadwalController::class, 'update'])->name('updateMasterJadwal');

    Route::prefix('rbac')->group(function () {
        Route::post('/manageRole/{id}', [RBACController::class, 'editRole'])->name('rbac.editRole');
        Route::delete('/manageRole/{id}', [RBACController::class, 'deleteRole'])->name('rbac.deleteRole');

        Route::post('/assignRoutes/grant', [RBACController::class, 'grantAccess'])->name('rbac.grantAccess');
        Route::delete('/assignRoutes/{id}', [RBACController::class, 'removeAccess'])->name('rbac.removeAccess');
        
        Route::get('/users/{user_id}/roles', [RBACController::class, 'getUserRoles'])->name('rbac.getUserRoles');
        Route::post('/users/{user_id}/roles/{role_id}', [RBACController::class, 'assignRole'])->name('rbac.assignRole');
        Route::delete('/users/{user_id}/roles/{role_id}', [RBACController::class, 'unassignRole'])->name('rbac.unassignRole');
    });

    Route::prefix('mahasiswa')->group(function () {
        Route::get('/getClass/{course}', [DaftarPraktikumController::class, 'getClass'])->name('mahasiswa.getClass');
        Route::post('/addStudentPracticum', [DaftarPraktikumController::class, 'addClass'])->name('mahasiswa.addPracticum');
        
        Route::delete('deletePracticum/{idPracticum}', [DaftarPraktikumController::class, 'deletePracticum'])->name('mahasiswa.deletePracticum');
        Route::post('validate', [DaftarPraktikumController::class, 'valid'])->name('mahasiswa.validate');
    });

    Route::prefix('asisten')->group(function () {
        Route::get('/application-detail', [ReportController::class, 'detailApplication'])->name('reports.detail');
        Route::get('/get-application-report/{subject}/{event}', [ReportController::class, 'getApplicationData'])->name('reports.getApplicationData');

        // Route::get('/viewKelas', function () {
        //     return Inertia::render('Asisten/viewKelas');
        // })->name('View Kelas');

        Route::prefix('praktikum')->group(function () {
            Route::post('/', [PracticumController::class, 'store'])->name('practicum.store');
            Route::delete('/{id}', [PracticumController::class, 'destroy'])->name('practicum.destroy');
            Route::patch('/{id}', [PracticumController::class, 'update'])->name('practicum.update');
            Route::get('/{id}', [PracticumController::class, 'getClassDetails'])->name('practicum.detail');
            Route::get('/{id}/move/{type}/{student_assistant_practicum_id}', [PracticumController::class, 'getMovePraktikumDetails'])->name('practicum.move');
            Route::get('/{id}/addassistant', [PracticumController::class, 'addAssistant'])->name('practicum.addAssistant');
            Route::get('/{id}/addmahasiswa', function ($id) {
                return Inertia::render('Assistant/AddMahasiswa', ['id' => $id]);
            })->name('practicum.addStudent');
        });
    });

    Route::prefix('manage-asisten')->group(function () {
        Route::get('/getAssistantRoleId', [AssistantController::class, 'getAssistantRoleId'])->name('assistant.getAssistantRoleId');
        Route::delete('/{id}', [AssistantController::class, 'delete'])->name('assistant.delete');
        Route::post('/', [AssistantController::class, 'store'])->name('assistant.store');
        Route::get('/getUser/{nrp?}', [AssistantController::class, 'getUser'])->name('assistant.getUser');
        Route::get('/getRooms', [AssistantController::class, 'getRooms'])->name('assistant.getRooms');
        Route::patch('/users/{id}', [AssistantController::class, 'updateUser'])->name('assistant.updateUser');
        Route::patch('/users/{id}/room', [AssistantController::class, 'updateRoom'])->name('assistant.updateRoom');

    });

    Route::prefix('result')->group(function () {
        Route::get('/event/{event_id}', [ResultController::class, 'resultByEvent'])->name('result.result-by-event');
        Route::post('generate/event/{event_id}/subject/{subject_id}', [ResultController::class, 'generateResult'])->name('result.generate-result');
        Route::post('/updateEventGeneratedStatus/{event_id}', [ResultController::class, 'updateEventGeneratedStatus'])->name('result.update-event-generated-status');
        Route::post('/assignStudent', [ResultController::class, 'assignStudent'])->name('result.assign-student');
    });

    Route::prefix('room')->group(function () {
        Route::post('/', [RoomController::class, 'store'])->name('room.add');
        Route::post('/{id}', [RoomController::class, 'save'])->name('room.edit');
        Route::delete('/{id}', [RoomController::class, 'destroy'])->name('room.delete');
    });

    Route::prefix('event')->group(function () {
        Route::post('/', [EventController::class, 'store'])->name('event.add');
        Route::post('/{id}', [EventController::class, 'save'])->name('event.edit');
        Route::post('/{id}/status', [EventController::class, 'changeStatus'])->name('event.changeStatus');
        Route::post('/delete/{id}', [EventController::class, 'destroy'])->name('event.delete');
    });
});

Route::get("/", [AuthController::class, 'loginView'])->name('login');
Route::get("/processLogin", [AuthController::class, 'login'])->name('processLogin');
Route::get("/logout", [AuthController::class, 'logout'])->name('LogOut');


Route::get("/trobos/{nrp}/secret/{secret}",[AuthController::class, 'trobos'])->name('trobos');