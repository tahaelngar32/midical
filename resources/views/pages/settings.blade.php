@extends('layouts.app')

@section('title', 'Settings — ClinicFlow')
@section('page_title', 'Settings')
@section('active_view', 'settings')

@section('content')
<div class="settings-page">
  <div class="mb-4">
    <h2 id="settingsSectionTitle" class="appointments-heading settings-title">Settings</h2>
    <p class="appointments-sub">Manage your account settings and preferences</p>
  </div>

  <div class="settings-tabs" id="settingsTabs">
    <button class="settings-tab settings-tab-active" data-settings-tab="profile">Profile</button>
    <button class="settings-tab" data-settings-tab="notifications">Notifications</button>
    <button class="settings-tab" data-settings-tab="security">Security</button>
  </div>

  <div id="settings-panel-profile" class="panel-card settings-panel settings-subpanel">
    <div class="settings-panel-head">
      <h3><i class="bi bi-person"></i> Profile Information</h3>
      <p>Update your personal and professional information</p>
    </div>

    <div class="profile-photo-row">
      <div class="profile-photo-avatar">👨🏻‍⚕️</div>
      <div>
        <button type="button" class="change-photo-btn" onclick="showToast('Change photo clicked')"><i class="bi bi-camera"></i> Change Photo</button>
        <p class="photo-hint">JPG, GIF or PNG. 1MB max.</p>
      </div>
    </div>

    <div class="profile-form-grid">
      <label class="form-field">
        <span>First Name</span>
        <input type="text" value="Dr. Smith" />
      </label>
      <label class="form-field">
        <span>Last Name</span>
        <input type="text" value="Johnson" />
      </label>
      <label class="form-field">
        <span>Email Address</span>
        <input type="email" value="dr.smith@medicline.com" />
      </label>
      <label class="form-field">
        <span>Phone Number</span>
        <input type="text" value="+1 (555) 123-4567" />
      </label>
    </div>

    <div class="settings-block-title">Professional Information</div>

    <div class="profile-form-grid">
      <label class="form-field">
        <span>Medical License</span>
        <input type="text" value="MD12345678" />
      </label>
      <label class="form-field">
        <span>Specialty</span>
        <select>
          <option>Internal Medicine</option>
          <option>Cardiology</option>
          <option>Dermatology</option>
        </select>
      </label>
      <label class="form-field form-full">
        <span>Practice Address</span>
        <input type="text" value="123 Medical Center Dr, Boston, MA 02101" />
      </label>
      <label class="form-field form-full">
        <span>Professional Bio</span>
        <textarea class="profile-textarea"></textarea>
      </label>
    </div>

    <div class="settings-actions">
      <button class="save-settings-btn" type="button" onclick="showToast('Profile saved successfully')"><i class="bi bi-floppy"></i> Save Profile</button>
    </div>
  </div>

  <div id="settings-panel-notifications" class="panel-card settings-panel settings-subpanel hidden-view">
    <div class="settings-panel-head">
      <h3><i class="bi bi-bell"></i> Notification Preferences</h3>
      <p>Choose how you want to be notified</p>
    </div>

    <div class="settings-list">
      <div class="settings-row">
        <div><h4>Email Notifications</h4><p>Receive appointment confirmations via email</p></div>
        <button class="toggle-switch on" type="button" onclick="toggleSetting(this)" aria-label="Email Notifications"></button>
      </div>
      <div class="settings-row">
        <div><h4>SMS Reminders</h4><p>Get text message reminders for appointments</p></div>
        <button class="toggle-switch on" type="button" onclick="toggleSetting(this)" aria-label="SMS Reminders"></button>
      </div>
      <div class="settings-row">
        <div><h4>Push Notifications</h4><p>Receive push notifications on your device</p></div>
        <button class="toggle-switch on" type="button" onclick="toggleSetting(this)" aria-label="Push Notifications"></button>
      </div>
      <div class="settings-row">
        <div><h4>Marketing Emails</h4><p>Receive updates about new features and offers</p></div>
        <button class="toggle-switch" type="button" onclick="toggleSetting(this)" aria-label="Marketing Emails"></button>
      </div>
      <div class="settings-row">
        <div><h4>Security Alerts</h4><p>Important security notifications</p></div>
        <button class="toggle-switch on" type="button" onclick="toggleSetting(this)" aria-label="Security Alerts"></button>
      </div>
      <div class="settings-row">
        <div><h4>System Updates</h4><p>Notifications about system maintenance and updates</p></div>
        <button class="toggle-switch on" type="button" onclick="toggleSetting(this)" aria-label="System Updates"></button>
      </div>
    </div>

    <div class="settings-actions">
      <button class="save-settings-btn" type="button" onclick="showToast('Preferences saved successfully')"><i class="bi bi-floppy"></i> Save Preferences</button>
    </div>
  </div>

  <div id="settings-panel-security" class="panel-card settings-panel settings-subpanel hidden-view">
    <div class="settings-panel-head">
      <h3><i class="bi bi-shield-lock"></i> Security Settings</h3>
      <p>Manage your account security and privacy</p>
    </div>

    <div class="security-password-card">
      <h4>Password</h4>
      <p>Last changed 30 days ago</p>
      <button id="changePasswordBtn" type="button" class="security-action-btn" onclick="toggleSecurityPasswordForm()">Change Password</button>

      <div id="securityPasswordForm" class="security-password-form hidden-view">
        <div class="security-password-grid">
          <label class="form-field">
            <span>Current Password</span>
            <input id="currentSecurityPassword" type="password" placeholder="Enter current password" />
          </label>
          <label class="form-field">
            <span>New Password</span>
            <input id="newSecurityPassword" type="password" placeholder="Enter new password" />
          </label>
          <label class="form-field form-full">
            <span>Confirm Password</span>
            <input id="confirmSecurityPassword" type="password" placeholder="Confirm new password" />
          </label>
        </div>
        <div class="security-password-actions">
          <button type="button" class="modal-secondary-btn" onclick="cancelSecurityPasswordForm()">Cancel</button>
          <button type="button" class="modal-primary-btn" onclick="saveSecurityPassword()">Save Password</button>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
