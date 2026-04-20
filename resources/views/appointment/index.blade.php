@extends('layouts.app')

@section('title', 'Appointments — ClinicFlow')
@section('page_title', 'Appointments')
@section('active_view', 'appointments')

@section('content')
<div class="mb-4 flex flex-wrap items-start justify-between gap-3">
  <div>
    <h2 class="appointments-heading">Appointment Management</h2>
    <p class="appointments-sub">Schedule and manage patient appointments</p>
  </div>
  <button class="new-btn" onclick="showToast('New appointment')"><i class="bi bi-plus-lg"></i><span>New Appointment</span></button>
</div>

<div class="panel-card mb-4">
  <div class="appointments-filters">
    <label class="search-field filter-search">
      <i class="bi bi-search text-slate-400"></i>
      <input id="appointmentsSearch" type="text" placeholder="Search patients or appointment types..." />
    </label>
    <label class="search-field filter-date">
      <i class="bi bi-calendar-event text-slate-400"></i>
      <input id="appointmentsDate" type="text" value="20-4-2026" />
    </label>
    <label class="search-field filter-status">
      <select id="appointmentsStatus" class="status-select">
        <option value="all">All Status</option>
        <option value="confirmed">Confirmed</option>
        <option value="in-progress">In-Progress</option>
      </select>
      <i class="bi bi-chevron-down text-slate-400"></i>
    </label>
  </div>
</div>

<div id="appointmentsManageList" class="appointments-manage-list">
  <article class="manage-row" data-search="sarah johnson consultation annual checkup blood pressure" data-status="confirmed">
    <div class="manage-main">
      <div class="appointment-avatar">SJ</div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="manage-name">Sarah Johnson</h4>
          <span class="status-chip status-confirmed"><i class="bi bi-check-circle"></i> Confirmed</span>
        </div>
        <div class="manage-meta">
          <span><i class="bi bi-clock"></i> 9:00 AM - 9:30 AM</span>
          <span><i class="bi bi-calendar3"></i> Consultation</span>
        </div>
        <div class="manage-note">Annual checkup and blood pressure monitoring</div>
      </div>
    </div>
    <div class="manage-actions">
      <button class="icon-btn" onclick="showToast('Call started')"><i class="bi bi-telephone"></i></button>
      <button class="icon-btn" onclick="showToast('Message opened')"><i class="bi bi-chat"></i></button>
      <button class="icon-btn" onclick="showToast('Edit appointment')"><i class="bi bi-pencil-square"></i></button>
      <button class="icon-btn danger" onclick="showToast('Appointment removed','error')"><i class="bi bi-trash"></i></button>
    </div>
  </article>

  <article class="manage-row" data-search="michael chen follow-up diabetes management in progress" data-status="in-progress">
    <div class="manage-main">
      <div class="appointment-avatar">MC</div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="manage-name">Michael Chen</h4>
          <span class="status-chip status-progress"><i class="bi bi-clock-history"></i> In-Progress</span>
        </div>
        <div class="manage-meta">
          <span><i class="bi bi-clock"></i> 10:30 AM - 11:00 AM</span>
          <span><i class="bi bi-calendar3"></i> Follow-up</span>
        </div>
        <div class="manage-note">Diabetes management follow-up</div>
      </div>
    </div>
    <div class="manage-actions">
      <button class="join-btn" onclick="showToast('Joining call')"><i class="bi bi-camera-video"></i> Join Call</button>
      <button class="icon-btn" onclick="showToast('Call started')"><i class="bi bi-telephone"></i></button>
      <button class="icon-btn" onclick="showToast('Message opened')"><i class="bi bi-chat"></i></button>
      <button class="icon-btn" onclick="showToast('Edit appointment')"><i class="bi bi-pencil-square"></i></button>
      <button class="icon-btn danger" onclick="showToast('Appointment removed','error')"><i class="bi bi-trash"></i></button>
    </div>
  </article>

  <article class="manage-row" data-search="emma davis consultation routine video medication review confirmed" data-status="confirmed">
    <div class="manage-main">
      <div class="appointment-avatar">ED</div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="manage-name">Emma Davis</h4>
          <span class="status-chip status-confirmed"><i class="bi bi-check-circle"></i> Confirmed</span>
        </div>
        <div class="manage-meta">
          <span><i class="bi bi-clock"></i> 11:30 AM - 12:00 PM</span>
          <span><i class="bi bi-calendar3"></i> Consultation</span>
        </div>
        <div class="manage-note">Routine video consultation and medication review</div>
      </div>
    </div>
    <div class="manage-actions">
      <button class="icon-btn" onclick="showToast('Start video')"><i class="bi bi-camera-video"></i></button>
      <button class="icon-btn" onclick="showToast('Call started')"><i class="bi bi-telephone"></i></button>
      <button class="icon-btn" onclick="showToast('Message opened')"><i class="bi bi-chat"></i></button>
      <button class="icon-btn" onclick="showToast('Edit appointment')"><i class="bi bi-pencil-square"></i></button>
      <button class="icon-btn danger" onclick="showToast('Appointment removed','error')"><i class="bi bi-trash"></i></button>
    </div>
  </article>
</div>
@endsection
