@extends('layouts.app')

@section('title', 'Schedule Management — ClinicFlow')
@section('page_title', 'Schedule Management')
@section('active_view', 'schedule')

@section('content')
<div class="mb-4">
  <h2 class="appointments-heading">Schedule Management</h2>
  <p class="appointments-sub">Add your available working hours by day and time range.</p>
</div>

<div class="panel-card page-form-card">
  <div class="panel-head">
    <div>
      <h3>Available Time Ranges</h3>
      <p>These slots will appear in appointment booking. Unavailable slots are disabled.</p>
    </div>
  </div>

 {{-- داخل الـ form tag بدل onsubmit --}}
<form method="POST" action="{{ route('schedule.store') }}" class="patient-form-grid">
  @csrf

  {{-- Validation errors --}}
  @error('overlap')
    <div class="form-full" style="color:#991b1b;font-size:13px;background:#fee2e2;padding:10px 14px;border-radius:8px;">
      {{ $message }}
    </div>
  @enderror

  {{-- باقي الحقول كما هي بس غيّر id → name --}}
  <label class="form-field">
    <span>Day</span>
    <select name="day" required>
      <option value="">Select day</option>
      @foreach(['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] as $d)
        <option value="{{ $d }}" {{ old('day') === $d ? 'selected' : '' }}>
          {{ ucfirst($d) }}
        </option>
      @endforeach
    </select>
  </label>

  <label class="form-field">
    <span>From</span>
    <input name="from" type="time" value="{{ old('from') }}" required />
  </label>

  <label class="form-field">
    <span>To</span>
    <input name="to" type="time" value="{{ old('to') }}" required />
  </label>

  <div class="form-full schedule-actions-row">
    <button class="modal-primary-btn" type="submit">
      <i class="bi bi-plus-lg"></i> Add Availability
    </button>
  </div>
</form>

{{-- قائمة الـ schedules --}}
<div id="scheduleAvailabilityList" class="schedule-availability-list">
  @forelse ($schedules as $schedule)
    <div class="schedule-availability-item {{ $schedule->is_active ? '' : 'schedule-item-inactive' }}">
      <div class="schedule-item-info">
        <span class="schedule-day">{{ ucfirst($schedule->day) }}</span>
        <span class="schedule-time">
          {{ \Carbon\Carbon::createFromTimeString($schedule->from)->format('h:i A') }}
          —
          {{ \Carbon\Carbon::createFromTimeString($schedule->to)->format('h:i A') }}
        </span>
      </div>
      <div class="schedule-item-actions">
        <form method="POST" action="{{ route('schedule.toggle', $schedule->id) }}" style="display:inline;">
          @csrf @method('PATCH')
          <button type="submit" class="icon-btn" title="{{ $schedule->is_active ? 'Deactivate' : 'Activate' }}">
            <i class="bi bi-{{ $schedule->is_active ? 'toggle-on' : 'toggle-off' }}"></i>
          </button>
        </form>
        <form method="POST" action="{{ route('schedule.destroy', $schedule->id) }}"
              style="display:inline;" onsubmit="return confirm('Remove this schedule?')">
          @csrf @method('DELETE')
          <button type="submit" class="icon-btn icon-btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </form>
      </div>
    </div>
  @empty
    <p style="color:#94a3b8;text-align:center;padding:24px;">
      No availability added yet.
    </p>
  @endforelse
</div>

  <div id="scheduleAvailabilityList" class="schedule-availability-list"></div>
</div>
@endsection
