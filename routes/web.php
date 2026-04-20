<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\ScheduleController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('auth.login');
// });



Auth::routes();

Route::middleware(['auth'])->group(function () {
    Route::view('/', 'pages.dashboard')->name('dashboard');

    // Schedule management + dynamic slots API
    Route::get('schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::post('schedule', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::delete('schedule/{id}', [ScheduleController::class, 'destroy'])->name('schedule.destroy');
    Route::patch('schedule/{id}/toggle', [ScheduleController::class, 'toggle'])->name('schedule.toggle');
    Route::get('schedule/slots', [ScheduleController::class, 'slots'])->name('schedule.slots');

    // Appointments
    Route::get('appointments', [AppointmentController::class, 'index'])->name('appointments.index');
    Route::post('appointments', [AppointmentController::class, 'store'])->name('appointments.store');
    Route::patch('appointments/{id}', [AppointmentController::class, 'update'])->name('appointments.update');
    Route::delete('appointments/{id}', [AppointmentController::class, 'destroy'])->name('appointments.destroy');

    // Patients
    Route::resource('patients', PatientController::class);

    // Prescriptions
    Route::get('prescriptions', [PrescriptionController::class, 'index'])->name('prescriptions.index');
    Route::post('prescriptions', [PrescriptionController::class, 'store'])->name('prescriptions.store');
    Route::get('prescriptions/{id}/download', [PrescriptionController::class, 'download'])->name('prescriptions.download');
    Route::patch('prescriptions/{id}', [PrescriptionController::class, 'update'])->name('prescriptions.update');
    Route::patch('prescriptions/{id}/status', [PrescriptionController::class, 'updateStatus'])->name('prescriptions.status');
    Route::delete('prescriptions/{id}', [PrescriptionController::class, 'destroy'])->name('prescriptions.destroy');

    Route::view('settings', 'pages.settings')->name('settings');
    Route::view('notifications', 'notification.index')->name('notifications.index');
});
