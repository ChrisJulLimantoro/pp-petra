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


Route::get("/viewMahasiswa", [BulkInsertStudentController::class, 'index'])->name('viewMahasiswa');
Route::post("/uploadMahasiswa", [BulkInsertStudentController::class, 'insert'])->name('uploadMahasiswa');
Route::get("/viewPRS/{student_id}", [BulkInsertStudentController::class, 'viewPrs'])->name('viewPRS');
Route::get("/viewJadwal", [JadwalController::class, 'index'])->name('viewJadwal');
Route::delete("/deleteMahasiswa/{idStudent}", [BulkInsertStudentController::class, 'delete'])->name('deleteMahasiswa');

Route::get("/viewJadwal", [JadwalController::class, 'index'])->name('viewJadwal');
Route::post("/addMasterJadwal", [JadwalController::class, 'insert'])->name('addMasterJadwal');
Route::delete("/deleteMasterJadwal/{deleteID}", [JadwalController::class, 'delete'])->name('deleteMasterJadwal');
Route::patch("/update/{id}", [JadwalController::class, 'update'])->name('updateMasterJadwal');

Route::get('/routes', [App\Http\Controllers\RBACController::class, 'getAllRoutes'])->name('routes');
Route::get("/", [AuthController::class, 'loginView'])->name('login');
Route::get("/processLogin", [AuthController::class, 'login'])->name('processLogin');
Route::get("/logout", [AuthController::class, 'logout'])->name('logout');
Route::prefix('rbac')->group(function () {
    Route::get('/manageRole', [RBACController::class, 'manageRole'])->name('rbac.manageRole');
    Route::post('/manageRole', [RBACController::class, 'addRole'])->name('rbac.addRole');
    Route::post('/manageRole/{id}', [RBACController::class, 'editRole'])->name('rbac.editRole');
    Route::delete('/manageRole/{id}', [RBACController::class, 'deleteRole'])->name('rbac.deleteRole');

    Route::get('/assignRoutes', [RBACController::class, 'assignRoutesView'])->name('rbac.assignRoutes');
    Route::post('/assignRoutes/grant', [RBACController::class, 'grantAccess'])->name('rbac.grantAccess');
    Route::delete('/assignRoutes/{id}', [RBACController::class, 'removeAccess'])->name('rbac.removeAccess');

    Route::get('/assignRole', [RBACController::class, 'assignRoleView'])->name('rbac.assignRoleView');
    Route::get('/users/{user_id}/roles', [RBACController::class, 'getUserRoles'])->name('rbac.getUserRoles');
    Route::post('/users/{user_id}/roles/{role_id}', [RBACController::class, 'assignRole'])->name('rbac.assignRole');
    Route::delete('/users/{user_id}/roles/{role_id}', [RBACController::class, 'unassignRole'])->name('rbac.unassignRole');
});

Route::prefix('mahasiswa')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('mahasiswa.dashboard');
    Route::get('/daftarPraktikum', [DaftarPraktikumController::class, 'getSubject'])->name('mahasiswa.daftarPraktikum');
    Route::get('/getClass/{course}', [DaftarPraktikumController::class, 'getClass'])->name('mahasiswa.getClass');
    Route::post('/addStudentPracticum', [DaftarPraktikumController::class, 'addClass'])->name('mahasiswa.addPracticum');
    Route::get('/viewKelas', [ViewPraktikumController::class, 'index'])->name('mahasiswa.viewKelasPraktikum');
    Route::delete('deletePracticum/{idPracticum}', [DaftarPraktikumController::class, 'deletePracticum'])->name('mahasiswa.deletePracticum');
    Route::post('validate', [DaftarPraktikumController::class, 'valid'])->name('mahasiswa.validate');
});

Route::prefix('asisten')->group(function () {
    Route::get('/', [ReportController::class, 'dashboard'])->name('asisten.dashboard');
    Route::get('/application-detail', [ReportController::class, 'detailApplication'])->name('reports.detail');
    Route::get('/get-application-report/{subject}/{event}', [ReportController::class, 'getApplicationData'])->name('reports.getApplicationData');


    Route::get('/viewKelas', function () {
        return Inertia::render('Asisten/viewKelas');
    })->name('View Kelas');

    Route::prefix('praktikum')->group(function () {
        Route::get('/', [PracticumController::class, 'index'])->name('practicum.index');
        Route::post('/', [PracticumController::class, 'store'])->name('practicum.store');
        Route::delete('/{id}', [PracticumController::class, 'destroy'])->name('practicum.destroy');
        Route::patch('/{id}', [PracticumController::class, 'update'])->name('practicum.update');
        Route::get('/{id}', [PracticumController::class, 'getClassDetails'])->name('practicum.detail');
        Route::get('/{id}/move/{type}/{student_assistant_practicum_id}', [PracticumController::class, 'getMovePraktikumDetails'])->name('practicum.move');
        Route::get('/{id}/addassistant', function ($id) {
            return Inertia::render('Assistant/AddAssistant', ['id' => $id]);
        })->name('practicum.addAssistant');
        Route::get('/{id}/addmahasiswa', function ($id) {
            return Inertia::render('Assistant/AddMahasiswa', ['id' => $id]);
        })->name('practicum.addStudent');
    });
});

Route::prefix('manage-asisten')->group(function () {
    Route::get('/', [AssistantController::class, 'index'])->name('assistant.index');
    Route::get('/getAssistantRoleId', [AssistantController::class, 'getAssistantRoleId'])->name('assistant.getAssistantRoleId');
    Route::delete('/{id}', [AssistantController::class, 'delete'])->name('assistant.delete');
    Route::post('/', [AssistantController::class, 'store'])->name('assistant.store');
    Route::get('/getUser/{nrp?}', [AssistantController::class, 'getUser'])->name('assistant.getUser');
    Route::get('/getRooms', [AssistantController::class, 'getRooms'])->name('assistant.getRooms');
    Route::patch('/users/{id}', [AssistantController::class, 'updateUser'])->name('assistant.updateUser');
    Route::patch('/users/{id}/room', [AssistantController::class, 'updateRoom'])->name('assistant.updateRoom');

});

Route::prefix('room')->group(function () {
    Route::get('/', [RoomController::class, 'index'])->name('room.all');
    // Route::get('/{id}', [RoomController::class, 'show'])->name('room.show');
    Route::post('/', [RoomController::class, 'store'])->name('room.add');
    Route::post('/{id}', [RoomController::class, 'save'])->name('room.edit');
    Route::delete('/{id}', [RoomController::class, 'destroy'])->name('room.delete');
});

Route::prefix('event')->group(function () {
    Route::get('/', [EventController::class, 'index'])->name('event.all');
    Route::post('/', [EventController::class, 'store'])->name('event.add');
    Route::post('/{id}', [EventController::class, 'save'])->name('event.edit');
    Route::post('/{id}/status', [EventController::class, 'changeStatus'])->name('event.changeStatus');
    Route::post('/delete/{id}', [EventController::class, 'destroy'])->name('event.delete');
});



Route::prefix('tutorial')->group(function () {
    Route::get('/contoh-datatable', function () {
        return Inertia::render('Tutorial/ContohDatatable');
    })->name('contoh.datatable');

    Route::get('/contoh-alert', function () {
        return Inertia::render('Tutorial/ContohAlert');
    })->name('tutorial.alert');
});

Route::prefix('asisten')->group(function () {
    Route::get('/viewAjar', [PracticumController::class, 'viewPracticum'])->name('View Kelas');
});

