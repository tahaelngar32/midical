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

    {{-- عرض أخطاء الـ Validation --}}
    @if ($errors->any())
      <div class="alert alert-danger" style="margin:0 0 16px;padding:12px 16px;border-radius:8px;background:#fee2e2;color:#991b1b;font-size:14px;">
        <ul style="margin:0;padding-left:18px;">
          @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
          @endforeach
        </ul>
      </div>
    @endif

    <form method="POST"
          action="{{ route('patients.store') }}"
          class="patient-form-grid">
      @csrf

      <label class="form-field">
        <span>First Name</span>
        <input name="first_name" type="text"
               placeholder="Enter first name"
               value="{{ old('first_name') }}" />
      </label>

      <label class="form-field">
        <span>Last Name</span>
        <input name="last_name" type="text"
               placeholder="Enter last name"
               value="{{ old('last_name') }}" />
      </label>

      <label class="form-field">
        <span>Age</span>
        <input name="age" type="number" min="0"
               placeholder="Age"
               value="{{ old('age') }}" />
      </label>

      <label class="form-field">
        <span>Gender</span>
        <select name="gender">
          <option value="">Select</option>
          <option value="Male"   {{ old('gender') === 'Male'   ? 'selected' : '' }}>Male</option>
          <option value="Female" {{ old('gender') === 'Female' ? 'selected' : '' }}>Female</option>
        </select>
      </label>

      <label class="form-field">
        <span>Blood Type</span>
        <input name="blood_type" type="text"
               placeholder="A+"
               value="{{ old('blood_type') }}" />
      </label>

      <label class="form-field form-span-2">
        <span>Phone</span>
        <input name="phone" type="text"
               placeholder="+1 234-567-8900"
               value="{{ old('phone') }}" />
      </label>

      <label class="form-field">
        <span>Email</span>
        <input name="email" type="email"
               placeholder="patient@email.com"
               value="{{ old('email') }}" />
      </label>

      <label class="form-field form-full">
        <span>Address</span>
        <input name="address" type="text"
               placeholder="Street address"
               value="{{ old('address') }}" />
      </label>

      <label class="form-field form-full">
        <span>Emergency Contact</span>
        <input name="emergency_contact" type="text"
               placeholder="Name - Phone"
               value="{{ old('emergency_contact') }}" />
      </label>

      <div class="modal-actions form-full">
        <a href="{{ route('patients.index') }}"
           class="modal-secondary-btn"
           style="display:inline-flex;align-items:center;padding:0 14px;">
          Cancel
        </a>
        <button type="submit" class="modal-primary-btn">Add Patient</button>
      </div>
    </form>
  </div>
</div>
@endsection
