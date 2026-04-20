<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prescription extends Model
{
    protected $fillable = [
        'patient_id',
        'medication',
        'dosage',
        'frequency',
        'duration',
        'quantity',
        'refills',
        'instructions',
        'status',
        'prescribed_at',
        'expires_at',
    ];

    protected $casts = [
        'prescribed_at' => 'date',
        'expires_at' => 'date',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
