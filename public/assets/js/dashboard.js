function openSidebar() {
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  if (!sidebar || !overlay) return;
  sidebar.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
}

function closeSidebar() {
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  if (!sidebar || !overlay) return;
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
}

function toggleProfileMenu(event) {
  event.stopPropagation();
  var dropdown = document.getElementById("profileDropdown");
  if (!dropdown) return;
  dropdown.classList.toggle("hidden");
}

document.addEventListener("click", function (e) {
  var wrap = document.getElementById("profileMenuWrap");
  var dropdown = document.getElementById("profileDropdown");
  if (dropdown && wrap && !wrap.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});

function showToast(message, type) {
  var toast = document.getElementById("toast");
  if (!toast) return;
  var tone = type || "success";
  toast.textContent = message;
  toast.classList.remove("bg-emerald-600", "bg-rose-600", "bg-amber-500");
  if (tone === "error") {
    toast.classList.add("bg-rose-600");
  } else if (tone === "warning") {
    toast.classList.add("bg-amber-500");
  } else {
    toast.classList.add("bg-emerald-600");
  }
  toast.classList.remove("opacity-0", "translate-y-10");
  toast.classList.add("opacity-100", "translate-y-0");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(function () {
    toast.classList.add("opacity-0", "translate-y-10");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 2200);
}

function markNotificationRead(button) {
  var item = button ? button.closest(".notification-item") : null;
  if (!item) return;
  item.classList.remove("unread");
  showToast("Notification marked as read");
}

function deleteNotification(button) {
  var item = button ? button.closest(".notification-item") : null;
  if (!item) return;
  item.remove();
  showToast("Notification deleted", "warning");
}

function toggleSetting(element) {
  if (!element) return;
  element.classList.toggle("on");
}

function clearSecurityPasswordFields() {
  var current = document.getElementById("currentSecurityPassword");
  var next = document.getElementById("newSecurityPassword");
  var confirm = document.getElementById("confirmSecurityPassword");
  if (current) current.value = "";
  if (next) next.value = "";
  if (confirm) confirm.value = "";
}

function toggleSecurityPasswordForm() {
  var form = document.getElementById("securityPasswordForm");
  var button = document.getElementById("changePasswordBtn");
  if (!form) return;
  var isHidden = form.classList.contains("hidden-view");
  form.classList.toggle("hidden-view", !isHidden);
  if (button) button.textContent = isHidden ? "Hide Password Form" : "Change Password";
}

function cancelSecurityPasswordForm() {
  var form = document.getElementById("securityPasswordForm");
  var button = document.getElementById("changePasswordBtn");
  if (!form) return;
  clearSecurityPasswordFields();
  form.classList.add("hidden-view");
  if (button) button.textContent = "Change Password";
}

function saveSecurityPassword() {
  var current = document.getElementById("currentSecurityPassword");
  var next = document.getElementById("newSecurityPassword");
  var confirm = document.getElementById("confirmSecurityPassword");
  var currentValue = current ? current.value.trim() : "";
  var nextValue = next ? next.value.trim() : "";
  var confirmValue = confirm ? confirm.value.trim() : "";
  if (!currentValue || !nextValue || !confirmValue) {
    showToast("Please fill all password fields", "warning");
    return;
  }
  if (nextValue.length < 8) {
    showToast("New password must be at least 8 characters", "warning");
    return;
  }
  if (nextValue !== confirmValue) {
    showToast("Password confirmation does not match", "error");
    return;
  }
  cancelSecurityPasswordForm();
  showToast("Password changed successfully");
}

function setActiveSettingsTab(tabName) {
  var title = document.getElementById("settingsSectionTitle");
  var tabs = document.querySelectorAll("#settingsTabs .settings-tab");
  var panels = document.querySelectorAll(".settings-subpanel");
  if (!tabs.length || !panels.length) return;
  tabs.forEach(function (tab) {
    tab.classList.toggle("settings-tab-active", tab.getAttribute("data-settings-tab") === tabName);
  });
  panels.forEach(function (panel) {
    panel.classList.add("hidden-view");
  });
  var targetPanel = document.getElementById("settings-panel-" + tabName);
  if (targetPanel) targetPanel.classList.remove("hidden-view");
  if (title) title.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);
}

function initSettingsTabs() {
  var tabs = document.querySelectorAll("#settingsTabs .settings-tab");
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var tabName = tab.getAttribute("data-settings-tab");
      if (tabName) setActiveSettingsTab(tabName);
    });
  });
}

function buildPatientRowMarkup(patient) {
  var safeId = patient.id || "#0";
  var safeEmail = patient.email || "patient@email.com";
  var safeAddress = patient.address || "Address not available";
  var safeBloodType = patient.bloodType || "N/A";
  var safeInsurance = patient.insurance || "N/A";
  var safeEmergencyName = patient.emergencyName || "Emergency Contact";
  var safeEmergencyPhone = patient.emergencyPhone || "-";
  return (
    '<article class="manage-row patient-row" data-search="' + patient.search + '" data-status="active" data-patient-id="' + safeId + '" data-name="' + patient.name + '" data-initials="' + patient.initials + '" data-age="' + patient.age + '" data-gender="' + patient.gender + '" data-phone="' + patient.phone + '" data-email="' + safeEmail + '" data-address="' + safeAddress + '" data-blood-type="' + safeBloodType + '" data-insurance="' + safeInsurance + '" data-emergency-name="' + safeEmergencyName + '" data-emergency-phone="' + safeEmergencyPhone + '">' +
    '<div class="manage-main">' +
    '<div class="appointment-avatar">' + patient.initials + '</div>' +
    '<div><div class="flex flex-wrap items-center gap-2">' +
    '<h4 class="manage-name">' + patient.name + '</h4>' +
    '<span class="status-chip patient-active"><i class="bi bi-check-circle"></i> active</span>' +
    '</div><div class="manage-meta">' +
    '<span><i class="bi bi-activity"></i> Age: ' + patient.ageGender + '</span>' +
    '<span><i class="bi bi-telephone"></i> ' + patient.phone + '</span>' +
    '<span><i class="bi bi-calendar3"></i> Last: ' + patient.lastVisit + '</span>' +
    '</div></div></div>' +
    '<div class="manage-actions">' +
    '<button class="action-pill" onclick="showToast(\'Schedule opened\')"><i class="bi bi-calendar-event"></i> Schedule</button>' +
    '<button class="action-pill" onclick="showToast(\'Prescription opened\')"><i class="bi bi-file-earmark-medical"></i> Prescribe</button>' +
    '<button class="icon-btn" onclick="openPatientModal(this)"><i class="bi bi-eye"></i></button>' +
    '</div></article>'
  );
}

function setPatientModalTab(tabName) {
  var tabs = document.querySelectorAll("#patientModalTabs .patient-modal-tab");
  var panels = document.querySelectorAll("#patientProfileModal .patient-modal-panel");
  if (!tabs.length || !panels.length) return;
  tabs.forEach(function (tab) {
    tab.classList.toggle("patient-modal-tab-active", tab.getAttribute("data-patient-tab") === tabName);
  });
  panels.forEach(function (panel) {
    panel.classList.add("hidden-view");
  });
  var panelMap = {
    overview: "patientPanelOverview",
    medical: "patientPanelMedical",
    appointments: "patientPanelAppointments",
    prescriptions: "patientPanelPrescriptions"
  };
  var target = document.getElementById(panelMap[tabName] || panelMap.overview);
  if (target) target.classList.remove("hidden-view");
}

function initPatientModalTabs() {
  var tabs = document.querySelectorAll("#patientModalTabs .patient-modal-tab");
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var tabName = tab.getAttribute("data-patient-tab");
      if (tabName) setPatientModalTab(tabName);
    });
  });
}

var scheduleStoreKey = "clinicflow_schedule_v1";
var bookedStoreKey = "clinicflow_booked_slots_v1";
var bookingState = { selectedSlot: "" };

function getAppointmentPatients() {
  var rows = document.querySelectorAll("#appointmentsManageList .manage-name");
  var names = [];
  rows.forEach(function (row) {
    var value = row.textContent ? row.textContent.trim() : "";
    if (!value || names.indexOf(value) !== -1) return;
    names.push(value);
  });
  return names;
}

function initAppointmentPatientSelect() {
  var select = document.getElementById("appointmentPatientName");
  if (!select) return;

  var patients = getAppointmentPatients();
  var currentValue = select.value;
  var options = ['<option value="">Search and select patient</option>'];
  patients.forEach(function (name) {
    options.push('<option value="' + name + '">' + name + '</option>');
  });
  select.innerHTML = options.join("");

  if (currentValue && patients.indexOf(currentValue) !== -1) {
    select.value = currentValue;
  }

  if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2) {
    var $select = window.jQuery(select);
    if ($select.hasClass("select2-hidden-accessible")) {
      $select.select2("destroy");
    }
    $select.select2({
      placeholder: "Search and select patient",
      width: "100%",
      dropdownParent: window.jQuery("#appointmentBookingModal .appointment-booking-panel")
    });
  }
}

function getDefaultScheduleAvailability() {
  return {
    sunday: [],
    monday: [{ id: 1, from: "09:00", to: "13:00" }, { id: 2, from: "14:00", to: "17:00" }],
    tuesday: [{ id: 3, from: "09:00", to: "13:00" }, { id: 4, from: "14:00", to: "17:00" }],
    wednesday: [{ id: 5, from: "09:00", to: "13:00" }, { id: 6, from: "14:00", to: "17:00" }],
    thursday: [{ id: 7, from: "09:00", to: "13:00" }, { id: 8, from: "14:00", to: "17:00" }],
    friday: [{ id: 9, from: "10:00", to: "14:00" }],
    saturday: []
  };
}

function readScheduleAvailability() {
  try {
    var raw = window.localStorage.getItem(scheduleStoreKey);
    if (!raw) return getDefaultScheduleAvailability();
    var parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : getDefaultScheduleAvailability();
  } catch (_error) {
    return getDefaultScheduleAvailability();
  }
}

function saveScheduleAvailability(data) {
  window.localStorage.setItem(scheduleStoreKey, JSON.stringify(data));
}

function readBookedSlots() {
  try {
    var raw = window.localStorage.getItem(bookedStoreKey);
    if (!raw) return {};
    var parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_error) {
    return {};
  }
}

function saveBookedSlots(data) {
  window.localStorage.setItem(bookedStoreKey, JSON.stringify(data));
}

function timeToMinutes(value) {
  var parts = (value || "").split(":");
  if (parts.length !== 2) return 0;
  return Number(parts[0]) * 60 + Number(parts[1]);
}

function minutesToTime(minutes) {
  var hours = Math.floor(minutes / 60);
  var mins = minutes % 60;
  return String(hours).padStart(2, "0") + ":" + String(mins).padStart(2, "0");
}

function formatSlotLabel(time24) {
  var parts = (time24 || "").split(":");
  if (parts.length !== 2) return time24;
  var h = Number(parts[0]);
  var m = parts[1];
  var period = h >= 12 ? "PM" : "AM";
  var normalized = h % 12 || 12;
  return normalized + ":" + m + " " + period;
}

function getDayKeyFromDate(dateValue) {
  if (!dateValue) return "";
  var weekday = new Date(dateValue + "T00:00:00").getDay();
  var labels = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return labels[weekday] || "";
}

function getRangesForDate(dateValue) {
  var schedule = readScheduleAvailability();
  var dayKey = getDayKeyFromDate(dateValue);
  return schedule[dayKey] || [];
}

function buildSlotsFromRanges(ranges) {
  var slots = [];
  ranges.forEach(function (range) {
    var start = timeToMinutes(range.from);
    var end = timeToMinutes(range.to);
    for (var minute = start; minute < end; minute += 30) {
      slots.push(minutesToTime(minute));
    }
  });
  return slots;
}

function renderScheduleAvailabilityList() {
  var list = document.getElementById("scheduleAvailabilityList");
  if (!list) return;

  var schedule = readScheduleAvailability();
  var dayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  var dayNames = {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday"
  };

  var rows = [];
  dayOrder.forEach(function (day) {
    var ranges = schedule[day] || [];
    ranges.forEach(function (range) {
      rows.push(
        '<article class="schedule-availability-row">' +
          '<div><h4>' + dayNames[day] + '</h4><p>' + formatSlotLabel(range.from) + ' - ' + formatSlotLabel(range.to) + '</p></div>' +
          '<button type="button" class="schedule-remove-btn" onclick="removeScheduleAvailability(\'' + day + '\',' + range.id + ')">Remove</button>' +
        '</article>'
      );
    });
  });

  list.innerHTML = rows.length ? rows.join("") : '<p class="appointments-sub">No availability ranges yet.</p>';
}

function addScheduleAvailability(event) {
  if (event) event.preventDefault();
  var day = document.getElementById("scheduleDay");
  var from = document.getElementById("scheduleFrom");
  var to = document.getElementById("scheduleTo");
  var form = document.getElementById("scheduleAvailabilityForm");
  var dayValue = day ? day.value : "";
  var fromValue = from ? from.value : "";
  var toValue = to ? to.value : "";

  if (!dayValue || !fromValue || !toValue) {
    showToast("Please select day and time range", "warning");
    return;
  }

  if (timeToMinutes(fromValue) >= timeToMinutes(toValue)) {
    showToast("End time must be greater than start time", "error");
    return;
  }

  var schedule = readScheduleAvailability();
  var current = schedule[dayValue] || [];
  var nextId = current.length ? Math.max.apply(null, current.map(function (item) { return item.id; })) + 1 : 1;
  current.push({ id: nextId, from: fromValue, to: toValue });
  schedule[dayValue] = current;
  saveScheduleAvailability(schedule);
  if (form) form.reset();
  renderScheduleAvailabilityList();
  renderAppointmentSlots();
  showToast("Availability added");
}

function removeScheduleAvailability(dayKey, slotId) {
  var schedule = readScheduleAvailability();
  var current = schedule[dayKey] || [];
  schedule[dayKey] = current.filter(function (item) {
    return item.id !== slotId;
  });
  saveScheduleAvailability(schedule);
  renderScheduleAvailabilityList();
  renderAppointmentSlots();
  showToast("Availability removed", "warning");
}

function openAppointmentBookingModal() {
  var modal = document.getElementById("appointmentBookingModal");
  if (!modal) return;
  modal.classList.remove("hidden-view");
  document.body.style.overflow = "hidden";
  renderAppointmentSlots();
  initAppointmentPatientSelect();
}

function closeAppointmentBookingModal(event) {
  var modal = document.getElementById("appointmentBookingModal");
  if (!modal) return;
  if (event && event.target !== modal) return;
  modal.classList.add("hidden-view");
  document.body.style.overflow = "";
  if (window.jQuery && window.jQuery.fn && window.jQuery.fn.select2) {
    window.jQuery("#appointmentPatientName").select2("close");
  }
}

function renderAppointmentSlots() {
  var dateInput = document.getElementById("appointmentDate");
  var slotsGrid = document.getElementById("appointmentSlotsGrid");
  var selectedSlotInput = document.getElementById("appointmentSelectedSlot");
  if (!dateInput || !slotsGrid || !selectedSlotInput) return;

  var dateValue = dateInput.value;
  var slots = buildSlotsFromRanges(getRangesForDate(dateValue));
  var bookedMap = readBookedSlots();
  var booked = bookedMap[dateValue] || [];
  bookingState.selectedSlot = "";
  selectedSlotInput.value = "";

  if (!dateValue) {
    slotsGrid.innerHTML = '<p class="appointment-slots-sub">Choose date first to display slots.</p>';
    return;
  }

  if (!slots.length) {
    slotsGrid.innerHTML = '<p class="appointment-slots-sub">No schedule available on this day.</p>';
    return;
  }

  slotsGrid.innerHTML = "";
  slots.forEach(function (slot) {
    var unavailable = booked.indexOf(slot) !== -1;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "appointment-slot-btn" + (unavailable ? " unavailable" : "");
    button.textContent = formatSlotLabel(slot);
    button.setAttribute("data-slot", slot);
    if (unavailable) {
      button.disabled = true;
      slotsGrid.appendChild(button);
      return;
    }
    button.addEventListener("click", function () {
      var all = document.querySelectorAll("#appointmentSlotsGrid .appointment-slot-btn");
      all.forEach(function (item) { item.classList.remove("selected"); });
      button.classList.add("selected");
      bookingState.selectedSlot = slot;
      selectedSlotInput.value = slot;
    });
    slotsGrid.appendChild(button);
  });
}

function submitAppointmentFromModal(event) {
  if (event) event.preventDefault();
  var form = document.getElementById("appointmentBookingForm");
  var patientName = document.getElementById("appointmentPatientName");
  var appointmentType = document.getElementById("appointmentType");
  var appointmentDate = document.getElementById("appointmentDate");
  var appointmentNote = document.getElementById("appointmentNote");
  var selectedSlotInput = document.getElementById("appointmentSelectedSlot");
  var list = document.getElementById("appointmentsManageList");

  var nameValue = patientName ? patientName.value.trim() : "";
  var typeValue = appointmentType ? appointmentType.value.trim() : "";
  var dateValue = appointmentDate ? appointmentDate.value : "";
  var noteValue = appointmentNote ? appointmentNote.value.trim() : "";
  var slotValue = selectedSlotInput ? selectedSlotInput.value : "";

  if (!nameValue || !typeValue || !dateValue) {
    showToast("Please choose patient, type and date", "warning");
    return;
  }

  if (!slotValue) {
    showToast("Please choose an available slot", "warning");
    return;
  }

  var bookedMap = readBookedSlots();
  var dayBooked = bookedMap[dateValue] || [];
  if (dayBooked.indexOf(slotValue) !== -1) {
    showToast("Slot is unavailable", "error");
    return;
  }
  dayBooked.push(slotValue);
  bookedMap[dateValue] = dayBooked;
  saveBookedSlots(bookedMap);

  if (list) {
    var parts = nameValue.split(" ").filter(Boolean);
    var initials = parts.map(function (p) { return p.charAt(0); }).join("").slice(0, 2).toUpperCase();
    var endSlot = minutesToTime(timeToMinutes(slotValue) + 30);
    var noteText = noteValue || "Booked from appointment form";
    var searchText = (nameValue + " " + typeValue + " " + noteText).toLowerCase();
    var rowMarkup =
      '<article class="manage-row" data-search="' + searchText + '" data-status="confirmed">' +
        '<div class="manage-main">' +
          '<div class="appointment-avatar">' + initials + '</div>' +
          '<div>' +
            '<div class="flex flex-wrap items-center gap-2">' +
              '<h4 class="manage-name">' + nameValue + '</h4>' +
              '<span class="status-chip status-confirmed"><i class="bi bi-check-circle"></i> Confirmed</span>' +
            '</div>' +
            '<div class="manage-meta">' +
              '<span><i class="bi bi-clock"></i> ' + formatSlotLabel(slotValue) + ' - ' + formatSlotLabel(endSlot) + '</span>' +
              '<span><i class="bi bi-calendar3"></i> ' + typeValue + '</span>' +
            '</div>' +
            '<div class="manage-note">' + noteText + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="manage-actions">' +
          '<button class="icon-btn" onclick="showToast(\'Call started\')"><i class="bi bi-telephone"></i></button>' +
          '<button class="icon-btn" onclick="showToast(\'Message opened\')"><i class="bi bi-chat"></i></button>' +
          '<button class="icon-btn" onclick="showToast(\'Edit appointment\')"><i class="bi bi-pencil-square"></i></button>' +
          '<button class="icon-btn danger" onclick="showToast(\'Appointment removed\',\'error\')"><i class="bi bi-trash"></i></button>' +
        '</div>' +
      '</article>';
    list.insertAdjacentHTML("afterbegin", rowMarkup);
  }

  if (form) form.reset();
  if (patientName) patientName.value = "";
  initAppointmentPatientSelect();
  bookingState.selectedSlot = "";
  renderAppointmentSlots();
  closeAppointmentBookingModal();
  showToast("Appointment booked successfully");
}

function initScheduleManagement() {
  var body = document.body;
  var activeView = body ? body.getAttribute("data-active-view") : "";
  if (activeView === "schedule") return;
  renderScheduleAvailabilityList();
}

function initAppointmentBookingModal() {
  var body = document.body;
  var activeView = body ? body.getAttribute("data-active-view") : "";
  if (activeView === "appointments") return;
  var dateInput = document.getElementById("appointmentDate");
  if (dateInput) {
    dateInput.addEventListener("change", renderAppointmentSlots);
  }
}

// function openPatientModal(trigger) {
//   var row = trigger ? trigger.closest(".patient-row") : null;
//   var modal = document.getElementById("patientProfileModal");
//   if (!row || !modal) return;
//   var data = row.dataset || {};

//   var setText = function (id, value) {
//     var element = document.getElementById(id);
//     if (!element) return;
//     element.textContent = value || "-";
//   };

//   setText("patientModalInitials", data.initials);
//   setText("patientModalName", data.name);
//   setText("patientModalId", data.patientId);
//   setText("patientModalPhone", data.phone);
//   setText("patientModalEmail", data.email);
//   setText("patientModalAddress", data.address);
//   setText("patientModalEmergencyName", data.emergencyName);
//   setText("patientModalEmergencyPhone", data.emergencyPhone);
//   setText("patientModalAge", data.age);
//   setText("patientModalGender", data.gender);
//   setText("patientModalBloodType", data.bloodType);
//   setText("patientModalInsurance", data.insurance);

//   setPatientModalTab("overview");
//   modal.classList.remove("hidden-view");
//   document.body.style.overflow = "hidden";
// }
function openPatientModal(btn) {
  const row = btn.closest('.patient-row');

  document.getElementById('patientModalInitials').textContent  = row.dataset.initials;
  document.getElementById('patientModalName').textContent      = row.dataset.name;
  document.getElementById('patientModalId').textContent        = row.dataset.patientId;
  document.getElementById('patientModalPhone').textContent     = row.dataset.phone;
  document.getElementById('patientModalEmail').textContent     = row.dataset.email;
  document.getElementById('patientModalAddress').textContent   = row.dataset.address;
  document.getElementById('patientModalEmergency').textContent = row.dataset.emergency;
  document.getElementById('patientModalAge').textContent       = row.dataset.age;
  document.getElementById('patientModalGender').textContent    = row.dataset.gender;
  document.getElementById('patientModalBloodType').textContent = row.dataset.bloodType;

  document.getElementById('patientProfileModal').classList.remove('hidden-view');
}

function closePatientModal(event) {
  var modal = document.getElementById("patientProfileModal");
  if (!modal) return;
  if (event && event.target !== modal) return;
  modal.classList.add("hidden-view");
  document.body.style.overflow = "";
}

function submitPatientForm(event) {
  if (event) event.preventDefault();
  var firstName = document.getElementById("patientFirstName");
  var lastName = document.getElementById("patientLastName");
  var age = document.getElementById("patientAge");
  var gender = document.getElementById("patientGender");
  var phone = document.getElementById("patientPhone");
  var email = document.getElementById("patientEmail");
  var firstValue = firstName ? firstName.value.trim() : "";
  var lastValue = lastName ? lastName.value.trim() : "";
  var ageValue = age ? age.value.trim() : "";
  var genderValue = gender ? gender.value.trim() : "";
  var phoneValue = phone ? phone.value.trim() : "";
  var emailValue = email ? email.value.trim() : "";
  if (!firstValue || !lastValue || !ageValue || !genderValue || !phoneValue || !emailValue) {
    showToast("Please fill the required patient fields", "warning");
    return;
  }
  showToast("Patient added successfully");
  window.setTimeout(function () {
    window.location.href = "/patients";
  }, 1200);
}

function filterDashboardRows(query) {
  var rows = document.querySelectorAll("#appointmentsList .appointment-row");
  rows.forEach(function (row) {
    var text = (row.getAttribute("data-search") || "").toLowerCase();
    row.style.display = !query || text.indexOf(query) !== -1 ? "flex" : "none";
  });
}

function filterAppointmentsRows(query) {
  var statusSelect = document.getElementById("appointmentsStatus");
  var selectedStatus = statusSelect ? statusSelect.value : "all";
  var rows = document.querySelectorAll("#appointmentsManageList .manage-row");
  rows.forEach(function (row) {
    var text = (row.getAttribute("data-search") || "").toLowerCase();
    var status = (row.getAttribute("data-status") || "").toLowerCase();
    var matchText = !query || text.indexOf(query) !== -1;
    var matchStatus = selectedStatus === "all" || status === selectedStatus;
    row.style.display = matchText && matchStatus ? "flex" : "none";
  });
}

function filterPatientsRows(query) {
  var rows = document.querySelectorAll("#patientsList .patient-row");
  rows.forEach(function (row) {
    var text = (row.getAttribute("data-search") || "").toLowerCase();
    row.style.display = !query || text.indexOf(query) !== -1 ? "flex" : "none";
  });
}

function filterNotificationsRows(query) {
  var filter = document.getElementById("notificationsFilter");
  var selectedType = filter ? filter.value : "all";
  var rows = document.querySelectorAll("#notificationsList .notification-item");
  rows.forEach(function (row) {
    var text = (row.getAttribute("data-search") || "").toLowerCase();
    var type = (row.getAttribute("data-type") || "").toLowerCase();
    var matchQuery = !query || text.indexOf(query) !== -1;
    var matchType = selectedType === "all" || type === selectedType;
    row.style.display = matchQuery && matchType ? "flex" : "none";
  });
}

function applySearch() {
  var body = document.body;
  var activeView = body ? body.getAttribute("data-active-view") : "dashboard";
  var querySource;
  if (activeView === "appointments") {
    querySource = document.getElementById("appointmentsSearch");
  } else if (activeView === "patients") {
    querySource = document.getElementById("patientsSearch");
  } else if (activeView === "notifications") {
    querySource = document.getElementById("searchInput");
  } else {
    querySource = document.getElementById("searchInput");
  }
  var query = querySource ? querySource.value.trim().toLowerCase() : "";
  if (activeView === "appointments") {
    filterAppointmentsRows(query);
  } else if (activeView === "patients") {
    filterPatientsRows(query);
  } else if (activeView === "notifications") {
    filterNotificationsRows(query);
  } else {
    filterDashboardRows(query);
  }
}

function initSearchFilter() {
  var topSearch = document.getElementById("searchInput");
  var appointmentsSearch = document.getElementById("appointmentsSearch");
  var patientsSearch = document.getElementById("patientsSearch");
  var statusSelect = document.getElementById("appointmentsStatus");
  var notificationsFilter = document.getElementById("notificationsFilter");
  [topSearch, appointmentsSearch, patientsSearch].forEach(function (input) {
    if (!input) return;
    input.addEventListener("input", applySearch);
  });
  if (statusSelect) statusSelect.addEventListener("change", applySearch);
  if (notificationsFilter) notificationsFilter.addEventListener("change", applySearch);
}

function initKeyboardShortcuts() {
  window.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closeSidebar();
    closePatientModal();
    closeAppointmentBookingModal();
  });
}

(function init() {
  initSearchFilter();
  initSettingsTabs();
  initScheduleManagement();
  initAppointmentBookingModal();
  initPatientModalTabs();
  setActiveSettingsTab("profile");
  initKeyboardShortcuts();
})();
