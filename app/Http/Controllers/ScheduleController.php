<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::orderByRaw("FIELD(day,
            'sunday','monday','tuesday','wednesday',
            'thursday','friday','saturday'
        )")->get();

        return view('schedule.index', compact('schedules'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'day'  => 'required|in:sunday,monday,tuesday,wednesday,thursday,friday,saturday',
            'from' => 'required|date_format:H:i',
            'to'   => 'required|date_format:H:i|after:from',
        ]);

        // منع التكرار لنفس اليوم والوقت
        $exists = Schedule::where('day', $validated['day'])
            ->where(function ($q) use ($validated) {
                $q->whereBetween('from', [$validated['from'], $validated['to']])
                  ->orWhereBetween('to',   [$validated['from'], $validated['to']]);
            })->exists();

        if ($exists) {
            return back()->withErrors(['overlap' => 'This time range overlaps with an existing schedule.']);
        }

        Schedule::create($validated);

        return back()->with('success', 'Availability added successfully.');
    }

    public function destroy(string $id)
    {
        Schedule::findOrFail($id)->delete();
        return back()->with('success', 'Schedule removed.');
    }

    public function toggle(string $id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->update(['is_active' => !$schedule->is_active]);
        return back()->with('success', 'Schedule updated.');
    }

    /**
     * API: إرجاع الـ slots المتاحة ليوم معين
     * يُستخدم من صفحة الحجز عبر JS
     */
    public function slots(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
        ]);

        $date    = $request->date;
        $dayName = strtolower(date('l', strtotime($date))); // "monday" etc.

        $schedules = Schedule::active()->forDay($dayName)->get();

        $allSlots = [];
        foreach ($schedules as $schedule) {
            foreach ($schedule->availableSlotsForDate($date) as $slot) {
                $allSlots[] = array_merge($slot, ['schedule_id' => $schedule->id]);
            }
        }

        return response()->json($allSlots);
    }
}