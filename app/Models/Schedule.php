<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;

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
        $columns = $this->getAppointmentsTableColumns();
        $hasSlotStart = isset($columns['slot_start']);
        $hasLegacyTime = isset($columns['appointment_time']);

        $bookedSlots = [];
        $query = $this->appointments()
            ->where('appointment_date', $date)
            ->whereNotIn('status', ['cancelled']);

        try {
            if ($hasSlotStart) {
                $bookedSlots = $query->pluck('slot_start')
                    ->map(function ($time) {
                        return $this->normalizeTimeValue($time);
                    })
                    ->filter()
                    ->values()
                    ->toArray();
            } elseif ($hasLegacyTime) {
                $bookedSlots = $query->pluck('appointment_time')
                    ->map(function ($time) {
                        return $this->normalizeTimeValue($time);
                    })
                    ->filter()
                    ->values()
                    ->toArray();
            }
        } catch (QueryException $exception) {
            // If schema changed and cache is stale, retry using legacy column.
            try {
                $bookedSlots = $query->pluck('appointment_time')
                    ->map(function ($time) {
                        return $this->normalizeTimeValue($time);
                    })
                    ->filter()
                    ->values()
                    ->toArray();
            } catch (\Throwable $ignore) {
                $bookedSlots = [];
            }
        }

        return array_map(function ($slot) use ($bookedSlots) {
            $slot['booked'] = in_array($slot['start'], $bookedSlots, true)
                || in_array($slot['start'] . ':00', $bookedSlots, true);
            return $slot;
        }, $this->generateSlots());
    }

    private function normalizeTimeValue($time): ?string
    {
        if (!$time) {
            return null;
        }

        try {
            return Carbon::parse((string) $time)->format('H:i');
        } catch (\Throwable $exception) {
            return null;
        }
    }

    private function getAppointmentsTableColumns(): array
    {
        try {
            $columns = Schema::getColumnListing('appointments');
            return array_fill_keys($columns, true);
        } catch (\Throwable $exception) {
            return [];
        }
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