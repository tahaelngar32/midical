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
  <button class="new-btn" onclick="openAppointmentBookingModal()">
    <i class="bi bi-plus-lg"></i><span>New Appointment</span>
  </button>
</div>

{{-- Flash Message --}}
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
      {{-- <input id="appointmentsDate" type="date" value="{{ $date }}" /> --}}
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

  @forelse ($appointments as $appt)
    @php
      $patient   = $appt->patient;
      $initials  = strtoupper(substr($patient->first_name, 0, 1) . substr($patient->last_name, 0, 1));
      $fullName  = $patient->first_name . ' ' . $patient->last_name;
      $chipClass = match($appt->status) {
          'confirmed'   => 'status-confirmed',
          'in-progress' => 'status-progress',
          'completed'   => 'status-completed',
          default       => 'status-confirmed',
      };
      $chipIcon  = match($appt->status) {
          'confirmed'   => 'check-circle',
          'in-progress' => 'clock-history',
          'completed'   => 'check-circle-fill',
          default       => 'check-circle',
      };
      $chipLabel = match($appt->status) {
          'confirmed'   => 'Confirmed',
          'in-progress' => 'In-Progress',
          'completed'   => 'Completed',
          default       => 'Confirmed',
      };
    @endphp

    <article class="manage-row"
      data-id="{{ $appt->id }}"
      data-search="{{ strtolower($fullName . ' ' . $appt->type . ' ' . $appt->note . ' ' . $appt->status) }}"
      data-status="{{ $appt->status }}">

      <div class="manage-main">
        <div class="appointment-avatar">{{ $initials }}</div>
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h4 class="manage-name">{{ $fullName }}</h4>
            <span class="status-chip {{ $chipClass }}">
              <i class="bi bi-{{ $chipIcon }}"></i> {{ $chipLabel }}
            </span>
          </div>
          <div class="manage-meta">
            <span>
              <i class="bi bi-clock"></i>
              {{ \Carbon\Carbon::createFromTimeString($appt->slot_start)->format('g:i A') }}
              -
              {{ \Carbon\Carbon::createFromTimeString($appt->slot_end)->format('g:i A') }}
            </span>
            <span><i class="bi bi-calendar3"></i> {{ $appt->type }}</span>
          </div>
          @if ($appt->note)
            <div class="manage-note">{{ $appt->note }}</div>
          @endif
        </div>
      </div>

      <div class="manage-actions">
        @if ($appt->status === 'in-progress')
          <button class="join-btn" onclick="showToast('Joining call')">
            <i class="bi bi-camera-video"></i> Join Call
          </button>
        @endif
        <button class="icon-btn" onclick="showToast('Call started')">
          <i class="bi bi-telephone"></i>
        </button>
        <button class="icon-btn" onclick="showToast('Message opened')">
          <i class="bi bi-chat"></i>
        </button>
        <button class="icon-btn" onclick="showToast('Edit appointment')">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="icon-btn danger" onclick="deleteAppointment({{ $appt->id }}, this)">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </article>

  @empty
    <div style="text-align:center;padding:48px 24px;color:#94a3b8;">
      <i class="bi bi-calendar-x" style="font-size:32px;display:block;margin-bottom:10px;"></i>
      <p>No appointments for this date.</p>
    </div>
  @endforelse

</div>

{{-- ───── Appointment Booking Modal ───── --}}
<div id="appointmentBookingModal" class="modal-backdrop hidden-view" onclick="closeAppointmentBookingModal(event)">
  <div class="modal-panel appointment-booking-panel" role="dialog" aria-modal="true" aria-labelledby="appointmentBookingTitle">
    <div class="modal-head">
      <div>
        <h3 id="appointmentBookingTitle">Add New Appointment</h3>
        <p>Choose patient, date, and one of the available slots only.</p>
      </div>
      <button class="modal-close-btn" type="button" onclick="closeAppointmentBookingModal()" aria-label="Close">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <form id="appointmentBookingForm" class="patient-form-grid" onsubmit="submitAppointmentFromModal(event)">

      <label class="form-field">
        <span>Patient Name</span>
        <select id="appointmentPatientName" required>
          <option value="">Search and select patient</option>
          @foreach ($paginate as $patient)
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
        <input id="appointmentDate" type="date"
               min="{{ today()->format('Y-m-d') }}" required />
      </label>

      <label class="form-field">
        <span>Note</span>
        <input id="appointmentNote" type="text" placeholder="Optional note" />
      </label>

      <div class="form-full">
        <h4 class="appointment-slots-title">Available Slots</h4>
        <input id="appointmentSelectedSlot" type="hidden" />
        <div id="appointmentSlotsGrid" class="appointment-slots-grid">
          <p id="slotsPlaceholder" style="color:#94a3b8;font-size:14px;">
            Select a date to see available slots.
          </p>
        </div>
      </div>

      <div class="modal-actions form-full">
        <button class="modal-secondary-btn" type="button" onclick="closeAppointmentBookingModal()">Cancel</button>
        <button class="modal-primary-btn" type="submit">Book Appointment</button>
      </div>
    </form>
  </div>
</div>

<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script>
const CSRF = document.querySelector('meta[name="csrf-token"]').content;

// ─── Modal open / close ───────────────────────────────────────────────────────
function openAppointmentBookingModal() {
  document.getElementById('appointmentBookingModal').classList.remove('hidden-view');
  // تفعيل select2 على الـ patient select
  $('#appointmentPatientName').select2({
    placeholder: 'Search and select patient',
    dropdownParent: $('#appointmentBookingModal .modal-panel'),
  });
}

function closeAppointmentBookingModal(e) {
  if (e && e.target !== document.getElementById('appointmentBookingModal')) return;
  document.getElementById('appointmentBookingModal').classList.add('hidden-view');
  resetBookingForm();
}

function resetBookingForm() {
  document.getElementById('appointmentBookingForm').reset();
  document.getElementById('appointmentSelectedSlot').value = '';
  document.getElementById('appointmentSlotsGrid').innerHTML =
    '<p id="slotsPlaceholder" style="color:#94a3b8;font-size:14px;">Select a date to see available slots.</p>';
  try { $('#appointmentPatientName').val(null).trigger('change'); } catch (_) {}
}

// ─── Filter: date change → reload page ───────────────────────────────────────
document.getElementById('appointmentsDate').addEventListener('change', function () {
  const url = new URL(window.location.href);
  url.searchParams.set('date', this.value);
  window.location.href = url.toString();
});

// ─── Filter: status ───────────────────────────────────────────────────────────
document.getElementById('appointmentsStatus').addEventListener('change', function () {
  const url = new URL(window.location.href);
  url.searchParams.set('status', this.value);
  window.location.href = url.toString();
});

// ─── Filter: search (client-side) ────────────────────────────────────────────
document.getElementById('appointmentsSearch').addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  document.querySelectorAll('#appointmentsManageList .manage-row').forEach(row => {
    const match = (row.dataset.search || '').includes(q);
    row.style.display = match ? '' : 'none';
  });
});

// ─── Slots: جلب الـ slots من الـ API عند اختيار تاريخ ────────────────────────
document.getElementById('appointmentDate').addEventListener('change', function () {
  const date  = this.value;
  const grid  = document.getElementById('appointmentSlotsGrid');

  if (!date) return;

  grid.innerHTML = '<p style="color:#94a3b8;font-size:14px;">Loading slots…</p>';
  document.getElementById('appointmentSelectedSlot').value = '';

  fetch(`/api/schedule/slots?date=${date}`, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  })
  .then(r => r.json())
  .then(slots => {
    grid.innerHTML = '';

    if (!slots.length) {
      grid.innerHTML = '<p style="color:#94a3b8;font-size:14px;">No available slots for this day.</p>';
      return;
    }

    slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'appointment-slot' + (slot.booked ? ' slot-booked' : '');
      btn.disabled  = slot.booked;
      btn.textContent = `${slot.start} – ${slot.end}`;
      btn.dataset.slot = JSON.stringify(slot);

      btn.addEventListener('click', () => {
        grid.querySelectorAll('.appointment-slot').forEach(b => b.classList.remove('slot-selected'));
        btn.classList.add('slot-selected');
        document.getElementById('appointmentSelectedSlot').value = btn.dataset.slot;
      });

      grid.appendChild(btn);
    });
  })
  .catch(() => {
    grid.innerHTML = '<p style="color:#ef4444;font-size:14px;">Failed to load slots. Try again.</p>';
  });
});

// ─── Submit: حجز الـ appointment ─────────────────────────────────────────────
function submitAppointmentFromModal(e) {
  e.preventDefault();

  const slotRaw = document.getElementById('appointmentSelectedSlot').value;
  if (!slotRaw) {
    showToast('Please select a time slot.', 'error');
    return;
  }

  const slot      = JSON.parse(slotRaw);
  const patientId = document.getElementById('appointmentPatientName').value;
  const type      = document.getElementById('appointmentType').value;
  const date      = document.getElementById('appointmentDate').value;
  const note      = document.getElementById('appointmentNote').value;

  if (!patientId || !type || !date) {
    showToast('Please fill all required fields.', 'error');
    return;
  }

  const submitBtn = document.querySelector('#appointmentBookingForm .modal-primary-btn');
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Booking…';

  fetch('/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': CSRF,
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      patient_id:       patientId,
      schedule_id:      slot.schedule_id,
      created_at: date,
      slot_start:       slot.start,
      slot_end:         slot.end,
      type,
      note,
    }),
  })
  .then(async r => {
    const data = await r.json();
    if (!r.ok) throw new Error(data.message || 'Booking failed.');
    return data;
  })
  .then(data => {
    showToast(data.message || 'Appointment booked successfully.');
    closeAppointmentBookingModal();
    // إعادة تحميل الصفحة بنفس التاريخ
    const url = new URL(window.location.href);
    url.searchParams.set('date', date);
    setTimeout(() => { window.location.href = url.toString(); }, 700);
  })
  .catch(err => {
    showToast(err.message, 'error');
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Book Appointment';
  });
}

// ─── Delete appointment ───────────────────────────────────────────────────────
function deleteAppointment(id, btn) {
  if (!confirm('Remove this appointment?')) return;

  fetch(`/appointments/${id}`, {
    method: 'DELETE',
    headers: {
      'X-CSRF-TOKEN': CSRF,
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
  .then(r => r.json())
  .then(data => {
    showToast(data.message || 'Appointment removed.', 'error');
    btn.closest('.manage-row').remove();

    // إذا مفيش rows تاني، اعرض رسالة فاضية
    const list = document.getElementById('appointmentsManageList');
    if (!list.querySelector('.manage-row')) {
      list.innerHTML = `
        <div style="text-align:center;padding:48px 24px;color:#94a3b8;">
          <i class="bi bi-calendar-x" style="font-size:32px;display:block;margin-bottom:10px;"></i>
          <p>No appointments for this date.</p>
        </div>`;
    }
  })
  .catch(() => showToast('Something went wrong.', 'error'));
}
</script>
@endsection