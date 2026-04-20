<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class Schedule extends Model
{
    protected $fillable = [
        'day',
        'from',
        'to',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // ─── Relations ───────────────────────────────────────
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    // ─── Helpers ─────────────────────────────────────────

    /**
     * Generate 30-min slots between from → to
     * Returns: [['start' => '09:00', 'end' => '09:30'], ...]
     */
    public function generateSlots(int $slotMinutes = 30): array
    {
        $slots  = [];
        $cursor = Carbon::createFromTimeString($this->from);
        $end    = Carbon::createFromTimeString($this->to);

        while ($cursor->copy()->addMinutes($slotMinutes)->lte($end)) {
            $slots[] = [
                'start' => $cursor->format('H:i'),
                'end'   => $cursor->copy()->addMinutes($slotMinutes)->format('H:i'),
            ];
            $cursor->addMinutes($slotMinutes);
        }

        return $slots;
    }

    /**
     * Get slots for a specific date, marking booked ones
     */
    public function availableSlotsForDate(string $date): array
    {
        $bookedSlots = $this->appointments()
            ->where('appointment_date', $date)
            ->whereNotIn('status', ['cancelled'])
            ->pluck('slot_start')
            ->toArray();

        return array_map(function ($slot) use ($bookedSlots) {
            $slot['booked'] = in_array($slot['start'] . ':00', $bookedSlots)
                           || in_array($slot['start'], $bookedSlots);
            return $slot;
        }, $this->generateSlots());
    }

    // ─── Scopes ──────────────────────────────────────────
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForDay($query, string $day)
    {
        return $query->where('day', strtolower($day));
    }
}