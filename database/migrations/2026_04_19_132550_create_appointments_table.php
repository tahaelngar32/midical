<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')
                  ->constrained('patients')
                  ->cascadeOnDelete();
            $table->foreignId('schedule_id')
                  ->constrained('schedules')
                  ->cascadeOnDelete();
            $table->date('appointment_date');
            $table->time('slot_start');
            $table->time('slot_end');
            $table->enum('type', [
                'Consultation',
                'Follow-up',
                'Video Consultation',
                'Prescription Review'
            ]);
            $table->enum('status', [
                'confirmed',
                'in-progress',
                'completed',
                'cancelled'
            ])->default('confirmed');
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};