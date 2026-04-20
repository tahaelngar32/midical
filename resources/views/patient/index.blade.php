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
  <a href="{{ route('patients.create') }}" class="new-btn"><i class="bi bi-plus-lg"></i><span>Add Patient</span></a>
</div>

<div class="panel-card mb-4">
  <div class="appointments-filters patients-filters">
    <label class="search-field filter-search full-width-filter">
      <i class="bi bi-search text-slate-400"></i>
      <input id="patientsSearch" type="text" placeholder="Search patients by name, email, or phone..." />
    </label>
  </div>
</div>

<div id="patientsList" class="appointments-manage-list">
  <article class="manage-row patient-row" data-search="sarah johnson age 34 female 234-567-8901 last 2024-01-10 active" data-status="active" data-patient-id="#1" data-name="Sarah Johnson" data-initials="SJ" data-age="34" data-gender="Female" data-phone="+1 234-567-8901" data-email="sarah.johnson@email.com" data-address="123 Main St, Boston, MA 02101" data-blood-type="A+" data-insurance="Blue Cross Blue Shield" data-emergency-name="John Johnson" data-emergency-phone="+1 234-567-8999">
    <div class="manage-main">
      <div class="appointment-avatar">SJ</div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="manage-name">Sarah Johnson</h4>
          <span class="status-chip patient-active"><i class="bi bi-check-circle"></i> active</span>
        </div>
        <div class="manage-meta">
          <span><i class="bi bi-activity"></i> Age: 34, Female</span>
          <span><i class="bi bi-telephone"></i> +1 234-567-8901</span>
          <span><i class="bi bi-calendar3"></i> Last: 2024-01-10</span>
        </div>
      </div>
    </div>
    <div class="manage-actions">
      <button class="action-pill" onclick="showToast('Schedule opened')"><i class="bi bi-calendar-event"></i> Schedule</button>
      <button class="action-pill" onclick="showToast('Prescription opened')"><i class="bi bi-file-earmark-medical"></i> Prescribe</button>
      <button class="icon-btn" onclick="openPatientModal(this)"><i class="bi bi-eye"></i></button>
    </div>
  </article>

  <article class="manage-row patient-row" data-search="michael chen age 42 male 234-567-8902 last 2024-01-08 active" data-status="active" data-patient-id="#2" data-name="Michael Chen" data-initials="MC" data-age="42" data-gender="Male" data-phone="+1 234-567-8902" data-email="michael.chen@email.com" data-address="47 Green St, Seattle, WA 98101" data-blood-type="B+" data-insurance="Aetna" data-emergency-name="Anna Chen" data-emergency-phone="+1 234-567-8123">
    <div class="manage-main">
      <div class="appointment-avatar">MC</div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="manage-name">Michael Chen</h4>
          <span class="status-chip patient-active"><i class="bi bi-check-circle"></i> active</span>
        </div>
        <div class="manage-meta">
          <span><i class="bi bi-activity"></i> Age: 42, Male</span>
          <span><i class="bi bi-telephone"></i> +1 234-567-8902</span>
          <span><i class="bi bi-calendar3"></i> Last: 2024-01-08</span>
        </div>
      </div>
    </div>
    <div class="manage-actions">
      <button class="action-pill" onclick="showToast('Schedule opened')"><i class="bi bi-calendar-event"></i> Schedule</button>
      <button class="action-pill" onclick="showToast('Prescription opened')"><i class="bi bi-file-earmark-medical"></i> Prescribe</button>
      <button class="icon-btn" onclick="openPatientModal(this)"><i class="bi bi-eye"></i></button>
    </div>
  </article>

  <article class="manage-row patient-row" data-search="emma davis age 28 female 234-567-8903 last 2024-01-05 active" data-status="active" data-patient-id="#3" data-name="Emma Davis" data-initials="ED" data-age="28" data-gender="Female" data-phone="+1 234-567-8903" data-email="emma.davis@email.com" data-address="88 River Ave, Austin, TX 73301" data-blood-type="O+" data-insurance="Cigna" data-emergency-name="Robert Davis" data-emergency-phone="+1 234-567-8777">
    <div class="manage-main">
      <div class="appointment-avatar">ED</div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="manage-name">Emma Davis</h4>
          <span class="status-chip patient-active"><i class="bi bi-check-circle"></i> active</span>
        </div>
        <div class="manage-meta">
          <span><i class="bi bi-activity"></i> Age: 28, Female</span>
          <span><i class="bi bi-telephone"></i> +1 234-567-8903</span>
          <span><i class="bi bi-calendar3"></i> Last: 2024-01-05</span>
        </div>
      </div>
    </div>
    <div class="manage-actions">
      <button class="action-pill" onclick="showToast('Schedule opened')"><i class="bi bi-calendar-event"></i> Schedule</button>
      <button class="action-pill" onclick="showToast('Prescription opened')"><i class="bi bi-file-earmark-medical"></i> Prescribe</button>
      <button class="icon-btn" onclick="openPatientModal(this)"><i class="bi bi-eye"></i></button>
    </div>
  </article>

  <article class="manage-row patient-row" data-search="james wilson age 56 male 234-567-8904 last 2023-12-20 inactive" data-status="inactive" data-patient-id="#4" data-name="James Wilson" data-initials="JW" data-age="56" data-gender="Male" data-phone="+1 234-567-8904" data-email="james.wilson@email.com" data-address="210 Lake Dr, Denver, CO 80014" data-blood-type="AB-" data-insurance="United Healthcare" data-emergency-name="Maria Wilson" data-emergency-phone="+1 234-567-8444">
    <div class="manage-main">
      <div class="appointment-avatar">JW</div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="manage-name">James Wilson</h4>
          <span class="status-chip patient-inactive"><i class="bi bi-dash-circle"></i> inactive</span>
        </div>
        <div class="manage-meta">
          <span><i class="bi bi-activity"></i> Age: 56, Male</span>
          <span><i class="bi bi-telephone"></i> +1 234-567-8904</span>
          <span><i class="bi bi-calendar3"></i> Last: 2023-12-20</span>
        </div>
      </div>
    </div>
    <div class="manage-actions">
      <button class="action-pill" onclick="showToast('Schedule opened')"><i class="bi bi-calendar-event"></i> Schedule</button>
      <button class="action-pill" onclick="showToast('Prescription opened')"><i class="bi bi-file-earmark-medical"></i> Prescribe</button>
      <button class="icon-btn" onclick="openPatientModal(this)"><i class="bi bi-eye"></i></button>
    </div>
  </article>
</div>

<div id="patientProfileModal" class="modal-backdrop hidden-view patient-profile-modal" onclick="closePatientModal(event)">
  <div class="modal-panel patient-profile-panel" role="dialog" aria-modal="true" aria-labelledby="patientModalName">
    <div class="patient-profile-head">
      <div class="patient-profile-identity">
        <div id="patientModalInitials" class="appointment-avatar">SJ</div>
        <div>
          <h3 id="patientModalName">Sarah Johnson</h3>
          <p>Patient ID: <span id="patientModalId">#1</span></p>
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
          <p><i class="bi bi-telephone"></i> <span id="patientModalPhone">+1 234-567-8901</span></p>
          <p><i class="bi bi-envelope"></i> <span id="patientModalEmail">sarah.johnson@email.com</span></p>
          <p><i class="bi bi-geo-alt"></i> <span id="patientModalAddress">123 Main St, Boston, MA 02101</span></p>
        </div>

        <h4 class="mt-4">Emergency Contact</h4>
        <div class="patient-modal-list">
          <p><span id="patientModalEmergencyName">John Johnson</span> - <span id="patientModalEmergencyPhone">+1 234-567-8999</span></p>
        </div>
      </div>

      <div>
        <h4>Personal Information</h4>
        <div class="patient-modal-list">
          <p>Age: <span id="patientModalAge">34</span></p>
          <p>Gender: <span id="patientModalGender">Female</span></p>
          <p>Blood Type: <span id="patientModalBloodType">A+</span></p>
          <p>Insurance: <span id="patientModalInsurance">Blue Cross Blue Shield</span></p>
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
