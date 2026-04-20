@extends('layouts.app')

@section('title', 'Appointments — ClinicFlow')
@section('page_title', 'Appointments')
@section('active_view', 'appointments')

@section('content')
<div class="mb-4 flex flex-wrap items-start justify-between gap-3">
  <div>
    <h5 class="appointments-heading">Appointment Management</h5>
    <p class="appointments-sub">Schedule and manage patient appointments</p>
  </div>
  <button class="new-btn" onclick="openAppointmentBookingModalServer()"><i class="bi bi-plus-lg"></i><span>New Appointment</span></button>
</div>

@if (session('success'))
  <div style="padding:12px 16px;border-radius:8px;background:#dcfce7;color:#166534;font-size:14px;margin-bottom:16px;">
    <i class="bi bi-check-circle"></i> {{ session('success') }}
  </div>
@endif

<div class="panel-card mb-4">
  <div class="appointments-filters">
    <label class="search-field filter-search">
      <i class="bi bi-search text-slate-400"></i>
      <input id="appointmentsSearch" type="text" placeholder="Search patients or appointment types..." />
    </label>
    <label class="search-field filter-date">
      <i class="bi bi-calendar-event text-slate-400"></i>
      <input id="appointmentsDate" type="date" value="{{ $date }}" />
    </label>
    <label class="search-field filter-status">
      <select id="appointmentsStatus" class="status-select">
        <option value="all" {{ $status === 'all' ? 'selected' : '' }}>All Status</option>
        <option value="confirmed" {{ $status === 'confirmed' ? 'selected' : '' }}>Confirmed</option>
        <option value="in-progress" {{ $status === 'in-progress' ? 'selected' : '' }}>In-Progress</option>
        <option value="completed" {{ $status === 'completed' ? 'selected' : '' }}>Completed</option>
        <option value="cancelled" {{ $status === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
      </select>
      <i class="bi bi-chevron-down text-slate-400"></i>
    </label>
  </div>
</div>

<div id="appointmentsManageList" class="appointments-manage-list">
  @forelse ($appointments as $appt)
    @php
      $patient = $appt->patient;
      $initials = strtoupper(substr($patient->first_name ?? 'P', 0, 1) . substr($patient->last_name ?? 'X', 0, 1));
      $fullName = trim(($patient->first_name ?? '') . ' ' . ($patient->last_name ?? '')) ?: 'Unknown Patient';
      $noteText = $appt->note ?? $appt->notes ?? null;
      $startRaw = $appt->slot_start ?? $appt->appointment_time ?? null;
      $endRaw = $appt->slot_end ?? ($startRaw ? \Carbon\Carbon::parse($startRaw)->addMinutes(30)->format('H:i:s') : null);
      $chipClass = match($appt->status) {
          'in-progress' => 'status-progress',
          'completed' => 'status-green',
          'cancelled' => 'status-muted',
          default => 'status-confirmed',
      };
      $chipLabel = ucfirst($appt->status);
    @endphp

    <article class="manage-row" data-id="{{ $appt->id }}" data-search="{{ strtolower($fullName . ' ' . $appt->type . ' ' . ($appt->note ?? '') . ' ' . $appt->status) }}" data-status="{{ $appt->status }}">
      <div class="manage-main">
        <div class="appointment-avatar">{{ $initials }}</div>
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h4 class="manage-name">{{ $fullName }}</h4>
            <span class="status-chip {{ $chipClass }}">{{ $chipLabel }}</span>
          </div>
          <div class="manage-meta">
            <span>
              <i class="bi bi-clock"></i>
              {{ $startRaw ? \Carbon\Carbon::parse($startRaw)->format('g:i A') : '-' }} - {{ $endRaw ? \Carbon\Carbon::parse($endRaw)->format('g:i A') : '-' }}
            </span>
            <span><i class="bi bi-calendar3"></i> {{ $appt->type }}</span>
          </div>
          @if ($noteText)
            <div class="manage-note">{{ $noteText }}</div>
          @endif
        </div>
      </div>
      <div class="manage-actions">
        <button class="icon-btn" onclick="showToast('Call started')"><i class="bi bi-telephone"></i></button>
        <button class="icon-btn" onclick="showToast('Message opened')"><i class="bi bi-chat"></i></button>
        <button class="icon-btn danger" onclick="deleteAppointmentServer({{ $appt->id }}, this)"><i class="bi bi-trash"></i></button>
      </div>
    </article>
  @empty
    <div style="text-align:center;padding:48px 24px;color:#94a3b8;">
      <i class="bi bi-calendar-x" style="font-size:32px;display:block;margin-bottom:10px;"></i>
      <p>No appointments found.</p>
    </div>
  @endforelse
</div>

<div id="appointmentBookingModal" class="modal-backdrop hidden-view" onclick="closeAppointmentBookingModalServer(event)">
  <div class="modal-panel appointment-booking-panel" role="dialog" aria-modal="true" aria-labelledby="appointmentBookingTitle">
    <div class="modal-head">
      <div>
        <h3 id="appointmentBookingTitle">Add New Appointment</h3>
        <p>Choose patient, date, and one of the available slots only.</p>
      </div>
      <button class="modal-close-btn" type="button" onclick="closeAppointmentBookingModalServer()" aria-label="Close">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <form id="appointmentBookingForm" class="patient-form-grid" onsubmit="submitAppointmentFromModalServer(event)">
      <label class="form-field">
        <span>Patient Name</span>
        <select id="appointmentPatientName" required>
          <option value="">Search and select patient</option>
          @foreach ($patients as $patient)
            <option value="{{ $patient->id }}">
              {{ $patient->first_name }} {{ $patient->last_name }}
            </option>
          @endforeach
        </select>
      </label>

      <label class="form-field">
        <span>Appointment Type</span>
        <select id="appointmentType" required>
          <option value="">Select type</option>
          <option value="Consultation">Consultation</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Video Consultation">Video Consultation</option>
          <option value="Prescription Review">Prescription Review</option>
        </select>
      </label>

      <label class="form-field">
        <span>Date</span>
        <input id="appointmentDate" type="date" min="{{ today()->format('Y-m-d') }}" required />
      </label>

      <label class="form-field">
        <span>Note</span>
        <input id="appointmentNote" type="text" placeholder="Optional note" />
      </label>

      <div class="form-full">
        <h4 class="appointment-slots-title">Available Slots</h4>
        <input id="appointmentSelectedSlot" type="hidden" />
        <div id="appointmentSlotsGrid" class="appointment-slots-grid">
          <p id="slotsPlaceholder" style="color:#94a3b8;font-size:14px;">Select a date to see available slots.</p>
        </div>
      </div>

      <div class="modal-actions form-full">
        <button class="modal-secondary-btn" type="button" onclick="closeAppointmentBookingModalServer()">Cancel</button>
        <button class="modal-primary-btn" type="submit">Book Appointment</button>
      </div>
    </form>
  </div>
</div>

<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script>
const csrfMeta = document.querySelector('meta[name="csrf-token"]');
const CSRF = csrfMeta ? csrfMeta.content : '';

function openAppointmentBookingModalServer() {
  document.getElementById('appointmentBookingModal').classList.remove('hidden-view');
  if ($('#appointmentPatientName').data('select2')) {
    $('#appointmentPatientName').select2('destroy');
  }
  $('#appointmentPatientName').select2({
    placeholder: 'Search and select patient',
    dropdownParent: $('#appointmentBookingModal .modal-panel'),
    width: '100%'
  });
}

function closeAppointmentBookingModalServer(e) {
  if (e && e.target !== document.getElementById('appointmentBookingModal')) return;
  document.getElementById('appointmentBookingModal').classList.add('hidden-view');
  resetBookingForm();
}

function resetBookingForm() {
  const form = document.getElementById('appointmentBookingForm');
  form.reset();
  document.getElementById('appointmentSelectedSlot').value = '';
  document.getElementById('appointmentSlotsGrid').innerHTML = '<p id="slotsPlaceholder" style="color:#94a3b8;font-size:14px;">Select a date to see available slots.</p>';
  try { $('#appointmentPatientName').val(null).trigger('change'); } catch (_) {}
}

const appointmentsDateInput = document.getElementById('appointmentsDate');
if (appointmentsDateInput) {
  appointmentsDateInput.addEventListener('change', function () {
    const url = new URL(window.location.href);
    if (this.value) {
      url.searchParams.set('date', this.value);
    } else {
      url.searchParams.delete('date');
    }
    window.location.href = url.toString();
  });
}

document.getElementById('appointmentsStatus').addEventListener('change', function () {
  const url = new URL(window.location.href);
  url.searchParams.set('status', this.value);
  window.location.href = url.toString();
});

document.getElementById('appointmentsSearch').addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  document.querySelectorAll('#appointmentsManageList .manage-row').forEach(row => {
    const match = (row.dataset.search || '').includes(q);
    row.style.display = match ? '' : 'none';
  });
});

document.getElementById('appointmentDate').addEventListener('change', function () {
  const date = this.value;
  const grid = document.getElementById('appointmentSlotsGrid');
  const selectedSlotInput = document.getElementById('appointmentSelectedSlot');

  if (!date) return;

  selectedSlotInput.value = '';
  grid.innerHTML = '<p style="color:#94a3b8;font-size:14px;">Loading slots...</p>';

  fetch(`/schedule/slots?date=${date}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    },
  })
    .then(r => r.json())
    .then(slots => {
      grid.innerHTML = '';

      if (!Array.isArray(slots) || !slots.length) {
        grid.innerHTML = '<p style="color:#94a3b8;font-size:14px;">No available slots for this day.</p>';
        return;
      }

      slots.forEach(slot => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'appointment-slot-btn' + (slot.booked ? ' unavailable' : '');
        btn.disabled = !!slot.booked;
        btn.textContent = slot.booked
          ? `${slot.start} - ${slot.end} (Booked)`
          : `${slot.start} - ${slot.end}`;
        btn.dataset.slot = JSON.stringify(slot);

        btn.addEventListener('click', function () {
          if (btn.disabled) return;
          grid.querySelectorAll('.appointment-slot-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedSlotInput.value = btn.dataset.slot;
        });

        grid.appendChild(btn);
      });
    })
    .catch(() => {
      grid.innerHTML = '<p style="color:#ef4444;font-size:14px;">Failed to load slots. Try again.</p>';
    });
});

function submitAppointmentFromModalServer(event) {
  event.preventDefault();

  const slotRaw = document.getElementById('appointmentSelectedSlot').value;
  if (!slotRaw) {
    showToast('Please select an available slot.', 'warning');
    return;
  }

  const slot = JSON.parse(slotRaw);
  const patientId = document.getElementById('appointmentPatientName').value;
  const type = document.getElementById('appointmentType').value;
  const date = document.getElementById('appointmentDate').value;
  const note = document.getElementById('appointmentNote').value;

  const submitBtn = document.querySelector('#appointmentBookingForm .modal-primary-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Booking...';

  fetch('/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': CSRF,
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      patient_id: patientId,
      schedule_id: slot.schedule_id,
      appointment_date: date,
      slot_start: slot.start,
      slot_end: slot.end,
      type: type,
      note: note,
    }),
  })
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Booking failed.');
      }
      return data;
    })
    .then(data => {
      showToast(data.message || 'Appointment booked successfully.');
      closeAppointmentBookingModalServer();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch(error => {
      showToast(error.message || 'Booking failed.', 'error');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Book Appointment';
    });
}

function deleteAppointmentServer(id, btn) {
  if (!confirm('Remove this appointment?')) return;

  fetch(`/appointments/${id}`, {
    method: 'DELETE',
    headers: {
      'X-CSRF-TOKEN': CSRF,
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    },
  })
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Delete failed.');
      }
      return data;
    })
    .then(data => {
      showToast(data.message || 'Appointment removed.', 'error');
      const row = btn.closest('.manage-row');
      if (row) row.remove();
    })
    .catch(error => {
      showToast(error.message || 'Something went wrong.', 'error');
    });
}

window.addEventListener('load', function () {
  // Keep server-driven handlers as the global ones used by inline onclick attributes.
  window.openAppointmentBookingModal = openAppointmentBookingModalServer;
  window.closeAppointmentBookingModal = closeAppointmentBookingModalServer;
  window.submitAppointmentFromModal = submitAppointmentFromModalServer;
  window.deleteAppointment = deleteAppointmentServer;
});
</script>
@endsection
