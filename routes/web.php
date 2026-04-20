<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ScheduleController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('auth.login');
// });



Auth::routes();

// Schedule
Route::get   ('schedule',                [ScheduleController::class, 'index'])->name('schedule.index');
Route::post  ('schedule',                [ScheduleController::class, 'store'])->name('schedule.store');
Route::delete('schedule/{id}',           [ScheduleController::class, 'destroy'])->name('schedule.destroy');
Route::patch ('schedule/{id}/toggle',    [ScheduleController::class, 'toggle'])->name('schedule.toggle');

Route::get('api/schedule/slots', [ScheduleController::class, 'slots'])->name('schedule.slots');

// Appointments
Route::get   ('appointments',       [AppointmentController::class, 'index'])->name('appointments.index');
Route::post  ('appointments',       [AppointmentController::class, 'store'])->name('appointments.store');
Route::patch ('appointments/{id}',  [AppointmentController::class, 'update'])->name('appointments.update');
Route::delete('appointments/{id}',  [AppointmentController::class, 'destroy'])->name('appointments.destroy');

//Route::view('/login', 'auth.login')->name('login');
Route::view('/', 'pages.dashboard')->name('dashboard');
//Route::view('/appointments', 'appointment.index')->name('appointments.index');
Route::view('/patients', 'patient.index')->name('patients.index');
Route::resource('patients', PatientController::class);
Route::view('/patients/create', 'patient.create')->name('patients.create');
Route::view('/settings', 'pages.settings')->name('settings');
Route::view('/notifications', 'notification.index')->name('notifications.index');


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
