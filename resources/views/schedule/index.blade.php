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

  <form id="scheduleAvailabilityForm" class="patient-form-grid" onsubmit="addScheduleAvailability(event)">
    <label class="form-field">
      <span>Day</span>
      <select id="scheduleDay" required>
        <option value="">Select day</option>
        <option value="sunday">Sunday</option>
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
        <option value="saturday">Saturday</option>
      </select>
    </label>

    <label class="form-field">
      <span>From</span>
      <input id="scheduleFrom" type="time" required />
    </label>

    <label class="form-field">
      <span>To</span>
      <input id="scheduleTo" type="time" required />
    </label>

    <div class="form-full schedule-actions-row">
      <button class="modal-primary-btn" type="submit"><i class="bi bi-plus-lg"></i> Add Availability</button>
    </div>
  </form>

  <div id="scheduleAvailabilityList" class="schedule-availability-list"></div>
</div>
@endsection
