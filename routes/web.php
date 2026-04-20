<?php

use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('auth.login');
// });



Auth::routes();

//Route::view('/login', 'auth.login')->name('login');
Route::view('/', 'pages.dashboard')->name('dashboard');
Route::view('/appointments', 'appointment.index')->name('appointments.index');
Route::view('/patients', 'patient.index')->name('patients.index');
Route::resource('patients', PatientController::class);
Route::view('/patients/create', 'patient.create')->name('patients.create');
Route::view('/settings', 'pages.settings')->name('settings');
Route::view('/notifications', 'notification.index')->name('notifications.index');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
