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
}
