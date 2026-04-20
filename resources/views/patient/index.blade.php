@extends('layouts.app')

@section('title', 'Patients — ClinicFlow')
@section('page_title', 'Patients')
@section('active_view', 'patients')

@section('content')
<div class="mb-4 flex flex-wrap items-start justify-between gap-3">
  <div>
    <h2 class="appointments-heading">Patient Management</h2>
    <p class="appointments-sub">Manage patient records and information</p>
  </div>
  <a href="{{ route('patients.create') }}" class="new-btn">
    <i class="bi bi-plus-lg"></i><span>Add Patient</span>
  </a>
</div>

{{-- Success Message --}}
@if (session('success'))
  <div class="alert-success mb-4" style="padding:12px 16px;border-radius:8px;background:#dcfce7;color:#166534;font-size:14px;">
    <i class="bi bi-check-circle"></i> {{ session('success') }}
  </div>
@endif

<div class="panel-card mb-4">
  <div class="appointments-filters patients-filters">
    <label class="search-field filter-search full-width-filter">
      <i class="bi bi-search text-slate-400"></i>
      <input id="patientsSearch" type="text" placeholder="Search patients by name, email, or phone..." />
    </label>
  </div>
</div>

<div id="patientsList" class="appointments-manage-list">

  @forelse ($patients as $patient)
    @php
      $initials = strtoupper(substr($patient->first_name, 0, 1) . substr($patient->last_name, 0, 1));
      $fullName  = $patient->first_name . ' ' . $patient->last_name;
      $status    = $patient->status ?? 'active';
      $lastVisit = $patient->last_visit?->format('Y-m-d') ?? '—';
      $searchStr = strtolower("{$fullName} age {$patient->age} {$patient->gender} {$patient->phone} last {$lastVisit} {$status}");
    @endphp

    <article class="manage-row patient-row"
      data-search="{{ $searchStr }}"
      data-status="{{ $status }}"
      data-patient-id="#{{ $patient->id }}"
      data-name="{{ $fullName }}"
      data-initials="{{ $initials }}"
      data-age="{{ $patient->age }}"
      data-gender="{{ $patient->gender }}"
      data-phone="{{ $patient->phone }}"
      data-email="{{ $patient->email }}"
      data-address="{{ $patient->address }}"
      data-blood-type="{{ $patient->blood_type }}"
      data-emergency="{{ $patient->emergency_contact }}">

      <div class="manage-main">
        <div class="appointment-avatar">{{ $initials }}</div>
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h4 class="manage-name">{{ $fullName }}</h4>
            @if ($status === 'active')
              <span class="status-chip patient-active"><i class="bi bi-check-circle"></i> active</span>
            @else
              <span class="status-chip patient-inactive"><i class="bi bi-dash-circle"></i> inactive</span>
            @endif
          </div>
          <div class="manage-meta">
            <span><i class="bi bi-activity"></i> Age: {{ $patient->age }}, {{ $patient->gender }}</span>
            <span><i class="bi bi-telephone"></i> {{ $patient->phone }}</span>
            <span><i class="bi bi-calendar3"></i> Last: {{ $lastVisit }}</span>
          </div>
        </div>
      </div>

      <div class="manage-actions">
        <button class="action-pill" onclick="showToast('Schedule opened')">
          <i class="bi bi-calendar-event"></i> Schedule
        </button>
        <button class="action-pill" onclick="showToast('Prescription opened')">
          <i class="bi bi-file-earmark-medical"></i> Prescribe
        </button>
        <button class="icon-btn" onclick="openPatientModal(this)">
          <i class="bi bi-eye"></i>
        </button>
        <a href="{{ route('patients.edit', $patient->id) }}" class="icon-btn">
          <i class="bi bi-pencil"></i>
        </a>
        <form method="POST" action="{{ route('patients.destroy', $patient->id) }}"
              onsubmit="return confirm('Delete this patient?')">
          @csrf
          @method('DELETE')
          <button type="submit" class="icon-btn icon-btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </form>
      </div>
    </article>

  @empty
    <div class="manage-row" style="justify-content:center;color:#94a3b8;padding:40px;">
      <i class="bi bi-person-x" style="font-size:24px;margin-bottom:8px;display:block;text-align:center;"></i>
      <p style="text-align:center;">No patients found. <a href="{{ route('patients.create') }}">Add your first patient</a>.</p>
    </div>
  @endforelse

</div>

{{-- Patient Profile Modal --}}
<div id="patientProfileModal" class="modal-backdrop hidden-view patient-profile-modal" onclick="closePatientModal(event)">
  <div class="modal-panel patient-profile-panel" role="dialog" aria-modal="true" aria-labelledby="patientModalName">
    <div class="patient-profile-head">
      <div class="patient-profile-identity">
        <div id="patientModalInitials" class="appointment-avatar"></div>
        <div>
          <h3 id="patientModalName"></h3>
          <p>Patient ID: <span id="patientModalId"></span></p>
        </div>
      </div>
      <button class="modal-close-btn" type="button" onclick="closePatientModal()" aria-label="Close">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div id="patientModalTabs" class="patient-modal-tabs">
      <button class="patient-modal-tab patient-modal-tab-active" type="button" data-patient-tab="overview">Overview</button>
      <button class="patient-modal-tab" type="button" data-patient-tab="medical">Medical</button>
      <button class="patient-modal-tab" type="button" data-patient-tab="appointments">Appointments</button>
      <button class="patient-modal-tab" type="button" data-patient-tab="prescriptions">Prescriptions</button>
    </div>

    <div id="patientPanelOverview" class="patient-modal-panel patient-modal-grid">
      <div>
        <h4>Contact Information</h4>
        <div class="patient-modal-list">
          <p><i class="bi bi-telephone"></i> <span id="patientModalPhone"></span></p>
          <p><i class="bi bi-envelope"></i> <span id="patientModalEmail"></span></p>
          <p><i class="bi bi-geo-alt"></i> <span id="patientModalAddress"></span></p>
        </div>
        <h4 class="mt-4">Emergency Contact</h4>
        <div class="patient-modal-list">
          <p><span id="patientModalEmergency"></span></p>
        </div>
      </div>
      <div>
        <h4>Personal Information</h4>
        <div class="patient-modal-list">
          <p>Age: <span id="patientModalAge"></span></p>
          <p>Gender: <span id="patientModalGender"></span></p>
          <p>Blood Type: <span id="patientModalBloodType"></span></p>
        </div>
      </div>
    </div>

    <div id="patientPanelMedical" class="patient-modal-panel hidden-view">
      <p class="patient-modal-placeholder">Medical history details will appear here.</p>
    </div>
    <div id="patientPanelAppointments" class="patient-modal-panel hidden-view">
      <p class="patient-modal-placeholder">Appointments timeline will appear here.</p>
    </div>
    <div id="patientPanelPrescriptions" class="patient-modal-panel hidden-view">
      <p class="patient-modal-placeholder">Prescriptions list will appear here.</p>
    </div>
  </div>
</div>
@endsection