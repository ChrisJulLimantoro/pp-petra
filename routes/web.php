<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PracticumController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RBACController;
use App\Http\Controllers\RBACRoleAssignmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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
    Route::get('/addRole', [RBACController::class, 'addRole'])->name('addRole');
    Route::get('/assignRoutes', [RBACController::class, 'assignRoutesView'])->name('rbac.assignRoutes');
    Route::post('/assignRoutes/grant', [RBACController::class, 'grantAccess'])->name('rbac.grantAccess');
    Route::delete('/assignRoutes/{id}', [RBACController::class, 'removeAccess'])->name('rbac.removeAccess');

    Route::get('/assignRole', [RBACController::class, 'assignRoleView'])->name('rbac.assignRole');
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

Route::prefix('assistant')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Assistant/Dashboard');
    })->name('Dashboard');

    Route::get('/detailkelas', function () {
        return Inertia::render('Assistant/DetailKelas');
    })->name('Detail Kelas');

});

Route::prefix('praktikum')->group(function () {
    Route::get('/', [PracticumController::class, 'index'])->name('practicum.index');
    Route::post('/', [PracticumController::class, 'store'])->name('practicum.store');
    Route::delete('/{id}', [PracticumController::class, 'destroy'])->name('practicum.destroy');
    Route::patch('/{id}', [PracticumController::class, 'update'])->name('practicum.update');
});