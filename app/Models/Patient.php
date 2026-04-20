<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'birth_date',
        'blood_type',
        'gender',
        'address',
        'emergency_contact',
    ];
    
    public function appointments()
{
    return $this->hasMany(Appointment::class);
}

public function lastAppointment()
{
    return $this->hasOne(Appointment::class)->latestOfMany('appointment_date');
}

public function prescriptions()
{
    return $this->hasMany(Prescription::class);
}
}
