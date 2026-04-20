@extends('layouts.app')

@section('title', 'Dashboard — ClinicFlow')
@section('page_title', 'Dashboard')
@section('active_view', 'dashboard')

@section('content')
<section class="hero-banner mb-5">
  <div class="hero-avatar" aria-hidden="true">
    <img src="{{ asset('assets/img/doctor-img.png') }}" alt="Doctor avatar" loading="lazy" />
  </div>
  <div>
    <h2>Good Morning, Dr. Ahmed Ali <span>👋🏻</span></h2>
    <p>You have 12 appointments scheduled for today. Here's your overview.</p>
  </div>
</section>

<section class="stats-grid mb-5">
  <article class="metric-card">
    <div>
      <p class="metric-label">Today's Appointments</p>
      <p class="metric-value">12</p>
      <p class="metric-trend">↗ +2.5%</p>
    </div>
    <div class="metric-icon"><i class="bi bi-calendar2-week"></i></div>
  </article>
  <article class="metric-card">
    <div>
      <p class="metric-label">Active Patients</p>
      <p class="metric-value">248</p>
      <p class="metric-trend">↗ +12%</p>
    </div>
    <div class="metric-icon"><i class="bi bi-people"></i></div>
  </article>
  <article class="metric-card">
    <div>
      <p class="metric-label">Prescriptions Issued</p>
      <p class="metric-value">34</p>
      <p class="metric-trend">↗ +8.2%</p>
    </div>
    <div class="metric-icon"><i class="bi bi-file-earmark-medical"></i></div>
  </article>
  <article class="metric-card">
    <div>
      <p class="metric-label">Video Consultations</p>
      <p class="metric-value">8</p>
      <p class="metric-trend">↗ +15%</p>
    </div>
    <div class="metric-icon"><i class="bi bi-camera-video"></i></div>
  </article>
</section>

<section class="panel-card mb-5">
  <div class="panel-head">
    <div>
      <h3>Today's Appointments</h3>
      <p>Manage your scheduled appointments</p>
    </div>
    <a href="{{ route('appointments.index') }}" class="view-all-btn">View All</a>
  </div>

  <div id="appointmentsList" class="appointment-list">
    <article class="appointment-row" data-search="sarah johnson consultation 9:00 am upcoming">
      <div class="appointment-left">
        <div class="appointment-avatar">SJ</div>
        <div>
          <h4>Sarah Johnson</h4>
          <p>Consultation</p>
        </div>
      </div>
      <div class="appointment-right">
        <div class="text-right">
          <p class="appointment-time">9:00 AM</p>
          <span class="status-chip status-muted">Upcoming</span>
        </div>
      </div>
    </article>

    <article class="appointment-row" data-search="michael chen follow-up 10:30 am in progress join">
      <div class="appointment-left">
        <div class="appointment-avatar">MC</div>
        <div>
          <h4>Michael Chen</h4>
          <p>Follow-up</p>
        </div>
      </div>
      <div class="appointment-right appointment-right-actions">
        <p class="appointment-time">10:30 AM</p>
        <span class="status-chip status-green">In Progress</span>
        <button class="join-btn" onclick="showToast('Joining consultation room')"><i class="bi bi-camera-video"></i> Join</button>
      </div>
    </article>
  </div>
</section>

<section class="panel-card">
  <div class="panel-head block">
    <div>
      <h3>Quick Actions</h3>
      <p>Access frequently used features</p>
    </div>
  </div>
  <div class="quick-actions">
    <a href="{{ route('appointments.index') }}" class="quick-action quick-action-primary"><i class="bi bi-calendar-event"></i><span>Schedule Appointment</span></a>
    <button class="quick-action" onclick="showToast('New Prescription clicked')"><i class="bi bi-file-earmark-medical"></i><span>New Prescription</span></button>
    <a href="{{ route('patients.create') }}" class="quick-action"><i class="bi bi-person-plus"></i><span>Add Patient</span></a>
    <button class="quick-action" onclick="showToast('Start Video Call clicked')"><i class="bi bi-camera-video"></i><span>Start Video Call</span></button>
  </div>
</section>
@endsection
