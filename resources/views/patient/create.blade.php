@extends('layouts.app')

@section('title', 'Add Patient — ClinicFlow')
@section('page_title', 'Add Patient')
@section('active_view', 'add-patient')

@section('content')
<div class="page-form-shell">
  <div class="page-form-card">
    <div class="modal-head">
      <div>
        <h3>Add New Patient</h3>
        <p>Enter patient information to create a new record</p>
      </div>
    </div>

    <form id="addPatientForm" class="patient-form-grid" onsubmit="submitPatientForm(event)">
      <label class="form-field">
        <span>First Name</span>
        <input id="patientFirstName" type="text" placeholder="Enter first name" />
      </label>

      <label class="form-field">
        <span>Last Name</span>
        <input id="patientLastName" type="text" placeholder="Enter last name" />
      </label>

      <label class="form-field">
        <span>Age</span>
        <input id="patientAge" type="number" min="0" placeholder="Age" />
      </label>

      <label class="form-field">
        <span>Gender</span>
        <select id="patientGender">
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>

      <label class="form-field">
        <span>Blood Type</span>
        <input id="patientBloodType" type="text" placeholder="A+" />
      </label>

      <label class="form-field form-span-2">
        <span>Phone</span>
        <input id="patientPhone" type="text" placeholder="+1 234-567-8900" />
      </label>

      <label class="form-field">
        <span>Email</span>
        <input id="patientEmail" type="email" placeholder="patient@email.com" />
      </label>

      <label class="form-field form-full">
        <span>Address</span>
        <input id="patientAddress" type="text" placeholder="Street address" />
      </label>

      <label class="form-field form-full">
        <span>Emergency Contact</span>
        <input id="patientEmergency" type="text" placeholder="Name - Phone" />
      </label>

      <div class="modal-actions form-full">
        <a href="{{ route('patients.index') }}" class="modal-secondary-btn" style="display:inline-flex;align-items:center;padding:0 14px;">Cancel</a>
        <button type="submit" class="modal-primary-btn">Add Patient</button>
      </div>
    </form>
  </div>
</div>
@endsection
