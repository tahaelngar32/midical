<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Doctor;

class AppointmentController extends Controller
{
    // عرض كل الحجوزات
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor'])
            ->latest()
            ->paginate(10);

        return view('appointment.index', compact('appointments'));
    }

    // صفحة إضافة حجز
    public function create()
    {
        $patients = Patient::all();
        $doctors = Doctor::all();

        return view('appointments.create', compact('patients', 'doctors'));
    }

    // حفظ الحجز
    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'status' => 'required',
            'notes' => 'nullable',
        ]);

        // منع تكرار نفس الموعد للدكتور
        $exists = Appointment::where('doctor_id', $data['doctor_id'])
            ->where('appointment_date', $data['appointment_date'])
            ->where('appointment_time', $data['appointment_time'])
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'appointment_time' => 'هذا الموعد محجوز بالفعل لهذا الدكتور'
            ])->withInput();
        }

        Appointment::create($data);

        return redirect()->route('appointment.index')
            ->with('success', 'تم إضافة الحجز بنجاح');
    }

    // تعديل
    public function edit($id)
    {
        $appointment = Appointment::findOrFail($id);
        $patients = Patient::all();
        $doctors = Doctor::all();

        return view('appointments.edit', compact('appointment', 'patients', 'doctors'));
    }

    // تحديث
    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'status' => 'required',
            'notes' => 'nullable',
        ]);

        // منع التكرار مع استثناء نفس الحجز
        $exists = Appointment::where('doctor_id', $data['doctor_id'])
            ->where('appointment_date', $data['appointment_date'])
            ->where('appointment_time', $data['appointment_time'])
            ->where('id', '!=', $id)
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'appointment_time' => 'هذا الموعد محجوز بالفعل'
            ])->withInput();
        }

        $appointment->update($data);

        return redirect()->route('appointments.index')
            ->with('success', 'تم تحديث الحجز');
    }

    // حذف
    public function destroy($id)
    {
        Appointment::findOrFail($id)->delete();

        return redirect()->back()
            ->with('success', 'تم حذف الحجز');
    }

    // عرض تفاصيل حجز
    public function show($id)
    {
        $appointment = Appointment::with(['patient', 'doctor'])
            ->findOrFail($id);

        return view('appointments.show', compact('appointment'));
    }
}