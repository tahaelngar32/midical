<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Throwable;
use Illuminate\View\View;

class AppointmentController extends Controller
{
    // عرض كل الحجوزات
    public function index(Request $request): View
    {
        $appointmentColumns = $this->getAppointmentColumns();

        $status = (string) $request->query('status', 'all');
        $date = (string) $request->query('date', '');

        $appointmentsQuery = Appointment::with(['patient'])
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($date !== '', function ($query) use ($date) {
                $query->whereDate('appointment_date', $date);
            });

        if (isset($appointmentColumns['schedule_id'])) {
            $appointmentsQuery->with('schedule');
        }

        $appointments = $appointmentsQuery->latest()->paginate(10);

        $patients = Patient::orderBy('first_name')->orderBy('last_name')->get();

        return view('appointment.index', compact('appointments', 'patients', 'status', 'date'));
    }

    // صفحة إضافة حجز
    // حفظ الحجز
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $appointmentColumns = $this->getAppointmentColumns();
        $hasModernSlots = isset($appointmentColumns['slot_start']) && isset($appointmentColumns['slot_end']);
        $hasLegacyTime = isset($appointmentColumns['appointment_time']);
        $hasScheduleId = isset($appointmentColumns['schedule_id']);
        $hasDoctorId = isset($appointmentColumns['doctor_id']);

        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'schedule_id' => 'nullable|exists:schedules,id',
            'appointment_date' => 'required|date',
            'slot_start' => 'nullable|date_format:H:i',
            'slot_end' => 'nullable|date_format:H:i|after:slot_start',
            'type' => 'required|in:Consultation,Follow-up,Video Consultation,Prescription Review',
            'note' => 'nullable|string|max:1000',
        ]);

        if (!$hasModernSlots && !$hasLegacyTime) {
            return $this->errorResponse($request, 'Appointments table schema is outdated. Please run migrations to add time columns.', 500, 'slot_start');
        }

        if (empty($data['schedule_id'])) {
            return $this->errorResponse($request, 'Please select a valid available slot.', 422, 'schedule_id');
        }

        if (empty($data['slot_start']) || empty($data['slot_end'])) {
            return $this->errorResponse($request, 'Please select a valid available slot.', 422, 'slot_start');
        }

        $schedule = Schedule::active()->find($data['schedule_id']);
        if (!$schedule) {
            return $this->errorResponse($request, 'This schedule is not active anymore.', 422, 'schedule_id');
        }

        $selectedDay = strtolower(Carbon::parse($data['appointment_date'])->format('l'));
        if ($selectedDay !== $schedule->day) {
            return $this->errorResponse($request, 'Selected date does not match this schedule day.', 422, 'appointment_date');
        }

        if ($data['slot_start'] < $schedule->from || $data['slot_end'] > $schedule->to) {
            return $this->errorResponse($request, 'Selected slot is outside available schedule range.', 422, 'slot_start');
        }

        $existsQuery = Appointment::where('appointment_date', $data['appointment_date'])
            ->where('status', '!=', 'cancelled');

        if ($hasScheduleId) {
            $existsQuery->where('schedule_id', $data['schedule_id']);
        }

        if ($hasModernSlots) {
            $existsQuery->where('slot_start', $data['slot_start'])
                ->where('slot_end', $data['slot_end']);
        } else {
            $existsQuery->where('appointment_time', $data['slot_start']);
        }

        $exists = $existsQuery->exists();

        if ($exists) {
            return $this->errorResponse($request, 'This slot is already booked.', 422, 'slot_start');
        }

        $payload = [
            'patient_id' => $data['patient_id'],
            'appointment_date' => $data['appointment_date'],
            'status' => 'confirmed',
        ];

        if ($hasScheduleId) {
            $payload['schedule_id'] = $data['schedule_id'];
        }

        if ($hasModernSlots) {
            $payload['slot_start'] = $data['slot_start'];
            $payload['slot_end'] = $data['slot_end'];
            $payload['type'] = $data['type'];
            if (isset($appointmentColumns['note'])) {
                $payload['note'] = $data['note'] ?? null;
            }
        } else {
            $payload['appointment_time'] = $data['slot_start'];
            if (isset($appointmentColumns['notes'])) {
                $payload['notes'] = $data['note'] ?? null;
            }
            if (isset($appointmentColumns['type'])) {
                $payload['type'] = $data['type'];
            }
        }

        if ($hasDoctorId) {
            $payload['doctor_id'] = 1;
        }

        $appointment = Appointment::create($payload);

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'message' => 'Appointment booked successfully.',
                'id' => $appointment->id,
            ], 201);
        }

        return redirect()->route('appointments.index')
            ->with('success', 'تم إضافة الحجز بنجاح');
    }

    // تحديث
    public function update(Request $request, $id)
    {
        $appointmentColumns = $this->getAppointmentColumns();
        $hasModernSlots = isset($appointmentColumns['slot_start']) && isset($appointmentColumns['slot_end']);
        $hasLegacyTime = isset($appointmentColumns['appointment_time']);
        $hasScheduleId = isset($appointmentColumns['schedule_id']);

        $appointment = Appointment::findOrFail($id);

        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'schedule_id' => 'nullable|exists:schedules,id',
            'appointment_date' => 'required|date',
            'slot_start' => 'nullable|date_format:H:i',
            'slot_end' => 'nullable|date_format:H:i|after:slot_start',
            'type' => 'required|in:Consultation,Follow-up,Video Consultation,Prescription Review',
            'status' => 'required',
            'note' => 'nullable|string|max:1000',
        ]);

        $existsQuery = Appointment::where('appointment_date', $data['appointment_date'])
            ->where('id', '!=', $id)
            ->where('status', '!=', 'cancelled');

        if ($hasScheduleId && !empty($data['schedule_id'])) {
            $existsQuery->where('schedule_id', $data['schedule_id']);
        }

        if ($hasModernSlots && !empty($data['slot_start']) && !empty($data['slot_end'])) {
            $existsQuery->where('slot_start', $data['slot_start'])
                ->where('slot_end', $data['slot_end']);
        } elseif ($hasLegacyTime && !empty($data['slot_start'])) {
            $existsQuery->where('appointment_time', $data['slot_start']);
        }

        $exists = $existsQuery->exists();

        if ($exists) {
            return back()->withErrors([
                'slot_start' => 'هذا الموعد محجوز بالفعل'
            ])->withInput();
        }

        $updatePayload = [
            'patient_id' => $data['patient_id'],
            'appointment_date' => $data['appointment_date'],
            'status' => $data['status'],
        ];

        if ($hasScheduleId && !empty($data['schedule_id'])) {
            $updatePayload['schedule_id'] = $data['schedule_id'];
        }

        if ($hasModernSlots) {
            $updatePayload['slot_start'] = $data['slot_start'];
            $updatePayload['slot_end'] = $data['slot_end'];
            $updatePayload['type'] = $data['type'];
            if (isset($appointmentColumns['note'])) {
                $updatePayload['note'] = $data['note'] ?? null;
            }
        } elseif ($hasLegacyTime) {
            $updatePayload['appointment_time'] = $data['slot_start'];
            if (isset($appointmentColumns['type'])) {
                $updatePayload['type'] = $data['type'];
            }
            if (isset($appointmentColumns['notes'])) {
                $updatePayload['notes'] = $data['note'] ?? null;
            }
        }

        $appointment->update($updatePayload);

        return redirect()->route('appointments.index')
            ->with('success', 'تم تحديث الحجز');
    }

    // حذف
    public function destroy(Request $request, $id): JsonResponse|RedirectResponse
    {
        Appointment::findOrFail($id)->delete();

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'message' => 'Appointment removed successfully.',
            ]);
        }

        return redirect()->back()
            ->with('success', 'تم حذف الحجز');
    }

    // عرض تفاصيل حجز
    public function show($id)
    {
        $appointment = Appointment::with(['patient', 'schedule'])
            ->findOrFail($id);

        return view('appointments.show', compact('appointment'));
    }

    private function errorResponse(Request $request, string $message, int $statusCode, string $field): JsonResponse|RedirectResponse
    {
        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'message' => $message,
                'errors' => [$field => [$message]],
            ], $statusCode);
        }

        return back()->withErrors([$field => $message])->withInput();
    }

    private function getAppointmentColumns(): array
    {
        try {
            $columns = Schema::getColumnListing('appointments');
            return array_fill_keys($columns, true);
        } catch (Throwable $exception) {
            return [];
        }
    }
}