<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $fillable = [
        'patient_id',
        'schedule_id',
        'doctor_id',
        'appointment_date',
        'appointment_time',
        'slot_start',
        'slot_end',
        'type',
        'status',
        'note',
        'notes',
    ];

    protected $casts = [
        'appointment_date' => 'date',
    ];

    // ─── Relations ───────────────────────────────────────
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function schedule(): BelongsTo
    {
        return $this->belongsTo(Schedule::class);
    }

    // ─── Scopes ──────────────────────────────────────────
    public function scopeForDate($query, string $date)
    {
        return $query->where('appointment_date', $date);
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'in-progress');
    }
}