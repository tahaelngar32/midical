<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ScheduleController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('auth.login');
// });



Auth::routes();
    // Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard');

// جميع الروابط داخل هذه المجموعة تتطلب تسجيل دخول
Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
    return view('pages.dashboard');
})->middleware('auth')->name('dashboard');
    // الصفحة الرئيسية (الداشبورد)
    // Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard');

    // جداول المواعيد - Schedule
    Route::get ('schedule',           [ScheduleController::class, 'index'])->name('schedule.index');
    Route::post ('schedule',          [ScheduleController::class, 'store'])->name('schedule.store');
    Route::delete('schedule/{id}',    [ScheduleController::class, 'destroy'])->name('schedule.destroy');
    Route::patch ('schedule/{id}/toggle', [ScheduleController::class, 'toggle'])->name('schedule.toggle');

    // المواعيد - Appointments
    Route::get ('appointments',       [AppointmentController::class, 'index'])->name('appointments.index');
    Route::post ('appointments',      [AppointmentController::class, 'store'])->name('appointments.store');
    Route::patch ('appointments/{id}', [AppointmentController::class, 'update'])->name('appointments.update');
    Route::delete('appointments/{id}', [AppointmentController::class, 'destroy'])->name('appointments.destroy');

    // المرضى - Patients
    Route::resource('patients', PatientController::class);
    
    // الإعدادات والتنبيهات
    Route::view('/settings', 'pages.settings')->name('settings');
    Route::view('/notifications', 'notification.index')->name('notifications.index');
});