@extends('layouts.app')

@section('title', 'Prescriptions - ClinicFlow')
@section('page_title', 'E-Prescription Management')
@section('active_view', 'prescriptions')

@section('content')
<div class="mb-4 flex flex-wrap items-start justify-between gap-3">
  <div>
    <h5 class="appointments-heading">E-Prescription Management</h5>
    <p class="appointments-sub">Create and manage electronic prescriptions</p>
  </div>
  <button class="new-btn" type="button" onclick="openPrescriptionModal()">
    <i class="bi bi-plus-lg"></i><span>New Prescription</span>
  </button>
</div>

@if (session('success'))
  <div class="success-alert mb-4">
    <i class="bi bi-check-circle"></i> {{ session('success') }}
  </div>
@endif

@if ($errors->any())
  <div class="error-alert mb-4">
    <i class="bi bi-exclamation-triangle"></i>
    {{ $errors->first() }}
  </div>
@endif

<section class="stats-grid mb-4 prescriptions-stats">
  <article class="metric-card">
    <div>
      <p class="metric-label">Total Prescriptions</p>
      <p class="metric-value">{{ $stats['total'] }}</p>
    </div>
    <div class="metric-icon"><i class="bi bi-clipboard2-pulse"></i></div>
  </article>
  <article class="metric-card">
    <div>
      <p class="metric-label">Pending</p>
      <p class="metric-value text-amber-600">{{ $stats['pending'] }}</p>
    </div>
    <div class="metric-icon"><i class="bi bi-hourglass-split"></i></div>
  </article>
  <article class="metric-card">
    <div>
      <p class="metric-label">Filled Today</p>
      <p class="metric-value text-sky-600">{{ $stats['filled_today'] }}</p>
    </div>
    <div class="metric-icon"><i class="bi bi-check2-circle"></i></div>
  </article>
  <article class="metric-card">
    <div>
      <p class="metric-label">Expiring Soon</p>
      <p class="metric-value text-rose-600">{{ $stats['expiring_soon'] }}</p>
    </div>
    <div class="metric-icon"><i class="bi bi-exclamation-triangle"></i></div>
  </article>
</section>

<div class="panel-card mb-4">
  <form method="GET" action="{{ route('prescriptions.index') }}" class="appointments-filters prescriptions-filters">
    <label class="search-field filter-search full-width-filter">
      <i class="bi bi-search text-slate-400"></i>
      <input type="text" name="q" value="{{ $search }}" placeholder="Search prescriptions by patient or medication..." />
    </label>

    <label class="search-field filter-status">
      <select name="status" class="status-select" onchange="this.form.submit()">
        <option value="all" {{ $status === 'all' ? 'selected' : '' }}>All Status</option>
        <option value="pending" {{ $status === 'pending' ? 'selected' : '' }}>Pending</option>
        <option value="filled" {{ $status === 'filled' ? 'selected' : '' }}>Filled</option>
        <option value="cancelled" {{ $status === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
      </select>
      <i class="bi bi-chevron-down text-slate-400"></i>
    </label>

    <button class="hidden" type="submit" aria-hidden="true"></button>
  </form>
</div>

<div class="appointments-manage-list">
  @forelse ($prescriptions as $prescription)
    @php
      $patient = $prescription->patient;
      $fullName = trim(($patient->first_name ?? '') . ' ' . ($patient->last_name ?? ''));
      $initials = strtoupper(substr($patient->first_name ?? 'P', 0, 1) . substr($patient->last_name ?? 'X', 0, 1));
      $statusClass = match($prescription->status) {
          'filled' => 'status-filled',
          'cancelled' => 'status-cancelled',
          default => 'status-pending',
      };
      $statusLabel = ucfirst($prescription->status);
    @endphp

    <article class="manage-row">
      <div class="manage-main">
        <div class="appointment-avatar">{{ $initials }}</div>
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h4 class="manage-name prescription-name">{{ $fullName ?: 'Unknown Patient' }}</h4>
            <span class="status-chip {{ $statusClass }}">{{ $statusLabel }}</span>
          </div>

          <div class="prescription-line">
            <span>{{ $prescription->medication }}</span>
            @if ($prescription->dosage)
              <span>{{ $prescription->dosage }}</span>
            @endif
            @if ($prescription->frequency)
              <span>{{ $prescription->frequency }}</span>
            @endif
            @if ($prescription->quantity)
              <span>{{ $prescription->quantity }}</span>
            @endif
            <span>Refills: {{ $prescription->refills }}</span>
          </div>

         

          @if ($prescription->instructions)
            <p class="prescription-text">Instructions: {{ $prescription->instructions }}</p>
          @endif

          <p class="prescription-text">Prescribed: {{ optional($prescription->prescribed_at)->format('Y-m-d') }}</p>
        </div>
      </div>

      <div class="manage-actions">
        <button class="icon-btn" type="button" onclick="showToast('View details')">
          <i class="bi bi-eye"></i>
        </button>
        <button class="icon-btn" type="button" onclick="showToast('Download started')">
          <i class="bi bi-download"></i>
        </button>
        <button class="icon-btn" type="button" onclick="showToast('Edit will be available soon')">
          <i class="bi bi-pencil-square"></i>
        </button>
        <form method="POST" action="{{ route('prescriptions.destroy', $prescription->id) }}" onsubmit="return confirm('Delete this prescription?')">
          @csrf
          @method('DELETE')
          <button class="icon-btn danger" type="submit">
            <i class="bi bi-trash"></i>
          </button>
        </form>
      </div>
    </article>
  @empty
    <div class="empty-state">
      <i class="bi bi-file-earmark-medical"></i>
      <p>No prescriptions found.</p>
    </div>
  @endforelse
</div>

@if ($prescriptions->hasPages())
  <div class="mt-4">
    {{ $prescriptions->links() }}
  </div>
@endif

<div id="prescriptionModal" class="modal-backdrop hidden-view" onclick="closePrescriptionModal(event)">
  <div class="modal-panel prescription-modal-panel" role="dialog" aria-modal="true" aria-labelledby="prescriptionModalTitle">
    <div class="modal-head">
      <div>
        <h3 id="prescriptionModalTitle">Create New Prescription</h3>
        <p>Enter prescription details for electronic prescribing</p>
      </div>
      <button class="modal-close-btn" type="button" onclick="closePrescriptionModal()" aria-label="Close">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <form id="prescriptionForm" method="POST" action="{{ route('prescriptions.store') }}" class="patient-form-grid">
      @csrf

      <label class="form-field form-full">
        <span>Patient</span>
        <select name="patient_id" required>
          <option value="">Select patient</option>
          @foreach ($patients as $patient)
            <option value="{{ $patient->id }}">{{ $patient->first_name }} {{ $patient->last_name }}</option>
          @endforeach
        </select>
      </label>

      <label class="form-field">
        <span>Medication</span>
        <input type="text" name="medication" placeholder="Search medication..." required />
      </label>

      <label class="form-field">
        <span>Dosage</span>
        <input type="text" name="dosage" placeholder="e.g., 10mg" />
      </label>

      <label class="form-field">
        <span>Frequency</span>
        <input type="text" name="frequency" placeholder="e.g., Once daily" />
      </label>

      <label class="form-field">
        <span>Duration</span>
        <input type="text" name="duration" placeholder="e.g., 30 days" />
      </label>

      <label class="form-field">
        <span>Quantity</span>
        <input type="text" name="quantity" placeholder="e.g., 30 tablets" />
      </label>

      <label class="form-field">
        <span>Refills</span>
        <select name="refills">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>

      

      <label class="form-field form-full">
        <span>Special Instructions</span>
        <textarea class="prescription-textarea" name="instructions" placeholder="Add any special instructions..."></textarea>
      </label>

      <div class="modal-actions form-full">
        <button class="modal-secondary-btn" type="button" onclick="closePrescriptionModal()">Cancel</button>
        <button class="modal-primary-btn" type="submit">Create Prescription</button>
      </div>
    </form>
  </div>
</div>

<script>
function openPrescriptionModal() {
  document.getElementById('prescriptionModal').classList.remove('hidden-view');
}

function closePrescriptionModal(event) {
  if (event && event.target !== document.getElementById('prescriptionModal')) return;
  document.getElementById('prescriptionModal').classList.add('hidden-view');
}

@if ($errors->any())
  openPrescriptionModal();
@endif
</script>
@endsection
