@extends('layouts.app')

@section('title', 'Notifications — ClinicFlow')
@section('page_title', 'Notifications')
@section('active_view', 'notifications')

@section('content')
<div class="notifications-page">
  <div class="notifications-stats">
    <article class="notification-stat-card">
      <p>Total</p>
      <h3>8</h3>
      <span class="stat-icon"><i class="bi bi-inbox"></i></span>
    </article>
    <article class="notification-stat-card">
      <p>Unread</p>
      <h3 class="text-rose-500">3</h3>
      <span class="stat-icon"><i class="bi bi-bell"></i></span>
    </article>
    <article class="notification-stat-card">
      <p>High Priority</p>
      <h3>2</h3>
      <span class="stat-icon"><i class="bi bi-exclamation-diamond"></i></span>
    </article>
    <article class="notification-stat-card">
      <p>Today</p>
      <h3>6</h3>
      <span class="stat-icon"><i class="bi bi-clock"></i></span>
    </article>
  </div>

  <div class="panel-card notification-filter-panel">
    <div class="notification-filter-row">
      <label for="notificationsFilter">Filter by:</label>
      <select id="notificationsFilter">
        <option value="all">All Notifications</option>
        <option value="appointment">Appointment</option>
        <option value="prescription">Prescription</option>
        <option value="system">System</option>
      </select>
    </div>
  </div>

  <div id="notificationsList" class="notifications-list">
    <article class="notification-item high unread" data-type="appointment" data-search="upcoming appointment sarah johnson video consultation high">
      <div class="notification-main">
        <div class="notification-icon"><i class="bi bi-calendar-event"></i></div>
        <div>
          <h4>Upcoming appointment with Sarah Johnson <span class="notif-dot">•</span></h4>
          <p>Video consultation scheduled for today at 2:00 PM</p>
          <div class="notification-meta">
            <span>5 minutes ago</span>
            <span class="chip-label">appointment</span>
            <span class="priority-label">High</span>
          </div>
        </div>
      </div>
      <div class="notification-actions">
        <button class="icon-btn" onclick="markNotificationRead(this)"><i class="bi bi-check-lg"></i></button>
        <button class="icon-btn danger" onclick="deleteNotification(this)"><i class="bi bi-trash"></i></button>
      </div>
    </article>

    <article class="notification-item info unread" data-type="prescription" data-search="prescription ready emma davis amoxicillin cvs pharmacy low">
      <div class="notification-main">
        <div class="notification-icon"><i class="bi bi-file-earmark-medical"></i></div>
        <div>
          <h4>Prescription ready for pickup <span class="notif-dot">•</span></h4>
          <p>Emma Davis - Amoxicillin prescription is ready at CVS Pharmacy</p>
          <div class="notification-meta">
            <span>1 hour ago</span>
            <span class="chip-label">prescription</span>
            <span class="priority-label">Low</span>
          </div>
        </div>
      </div>
      <div class="notification-actions">
        <button class="icon-btn" onclick="markNotificationRead(this)"><i class="bi bi-check-lg"></i></button>
        <button class="icon-btn danger" onclick="deleteNotification(this)"><i class="bi bi-trash"></i></button>
      </div>
    </article>

    <article class="notification-item" data-type="system" data-search="security alert new device login new york high">
      <div class="notification-main">
        <div class="notification-icon"><i class="bi bi-shield-lock"></i></div>
        <div>
          <h4>Security alert</h4>
          <p>New device login detected from New York, NY</p>
          <div class="notification-meta">
            <span>2 hours ago</span>
            <span class="chip-label">system</span>
            <span class="priority-label">High</span>
          </div>
        </div>
      </div>
      <div class="notification-actions">
        <button class="icon-btn danger" onclick="deleteNotification(this)"><i class="bi bi-trash"></i></button>
      </div>
    </article>

    <article class="notification-item" data-type="appointment" data-search="appointment cancelled james wilson medium">
      <div class="notification-main">
        <div class="notification-icon"><i class="bi bi-calendar-x"></i></div>
        <div>
          <h4>Appointment cancelled</h4>
          <p>James Wilson canceled his 3:30 PM appointment</p>
          <div class="notification-meta">
            <span>3 hours ago</span>
            <span class="chip-label">appointment</span>
            <span class="priority-label">Medium</span>
          </div>
        </div>
      </div>
      <div class="notification-actions">
        <button class="icon-btn danger" onclick="deleteNotification(this)"><i class="bi bi-trash"></i></button>
      </div>
    </article>
  </div>
</div>
@endsection
