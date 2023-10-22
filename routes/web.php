<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RBACController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RBACRoleAssignmentController;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/routes', [App\Http\Controllers\RBACController::class, 'getAllRoutes'])->name('routes');
Route::get("/login", [AuthController::class, 'loginView'])->name('login');
Route::get("/processLogin", [AuthController::class, 'login'])->name('processLogin');
Route::get("/logout", [AuthController::class, 'logout'])->name('logout');
Route::prefix('rbac')->group(function () {
    Route::get('/', [RBACController::class, 'getAllRoutes'])->name('dashboard');
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
    Route::get('/', function () {
        return Inertia::render('Mahasiswa/Dashboard');
    })->name('Dashboard');

    Route::get('/daftarPraktikum', function () {
        return Inertia::render('Mahasiswa/DaftarPraktikum');
    })->name('Daftar Praktikum');
});

Route::prefix('room')->group(function() {
    Route::get('/', [RoomController::class, 'index'])->name('room.all');
    // Route::get('/{id}', [RoomController::class, 'show'])->name('room.show');
    Route::post('/', [RoomController::class, 'store'])->name('room.add');
    Route::post('/{id}', [RoomController::class, 'save'])->name('room.edit');
    Route::delete('/{id}', [RoomController::class, 'destroy'])->name('room.delete');
});

Route::get('/contoh-datatable', function() {
    return Inertia::render('ContohDatatable');
})->name('contoh.datatable');

Route::prefix('asisten')->group(function () {
    Route::get('/viewKelas', function () {
        return Inertia::render('Asisten/viewKelas');
    })->name('View Kelas');
});