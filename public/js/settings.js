function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  if (!sidebar || !overlay) return;

  sidebar.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  if (!sidebar || !overlay) return;

  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
}

function toggleSwitch(element) {
  element.classList.toggle("on");
}

function togglePasswordForm() {
  const form = document.getElementById("passwordForm");
  if (!form) return;

  form.classList.toggle("hidden");
}

function clearPasswordForm() {
  const currentPassword = document.getElementById("currentPassword");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  if (currentPassword) currentPassword.value = "";
  if (newPassword) newPassword.value = "";
  if (confirmPassword) confirmPassword.value = "";
}

function cancelPasswordForm() {
  const form = document.getElementById("passwordForm");
  if (!form) return;

  clearPasswordForm();
  form.classList.add("hidden");
}

function saveProfile() {
  const payload = getSettingsPayload();
  showToast("Profile saved successfully");
  return payload;
}

function savePassword() {
  const currentPassword = document.getElementById("currentPassword");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  const currentValue = currentPassword ? currentPassword.value.trim() : "";
  const newValue = newPassword ? newPassword.value.trim() : "";
  const confirmValue = confirmPassword ? confirmPassword.value.trim() : "";

  if (!currentValue || !newValue || !confirmValue) {
    showToast("Please fill all password fields", "error");
    return null;
  }

  if (newValue.length < 8) {
    showToast("New password must be at least 8 characters", "error");
    return null;
  }

  if (newValue !== confirmValue) {
    showToast("Password confirmation does not match", "error");
    return null;
  }

  clearPasswordForm();
  document.getElementById("passwordForm").classList.add("hidden");
  showToast("Password updated successfully");

  return {
    current_password: currentValue,
    password: newValue,
    password_confirmation: confirmValue
  };
}

function getNotificationSettings() {
  const toggles = document.querySelectorAll("[data-setting]");
  const result = {};

  toggles.forEach(function (toggle) {
    const key = toggle.getAttribute("data-setting");
    if (!key) return;
    result[key] = toggle.classList.contains("on");
  });

  return result;
}

function getSettingsPayload() {
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const language = document.getElementById("language");
  const timezone = document.getElementById("timezone");

  return {
    full_name: fullName ? fullName.value : "",
    email: email ? email.value : "",
    language: language ? language.value : "",
    timezone: timezone ? timezone.value : "",
    notifications: getNotificationSettings()
  };
}

function hydrateSettings(payload) {
  if (!payload || typeof payload !== "object") return;

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const language = document.getElementById("language");
  const timezone = document.getElementById("timezone");

  if (fullName && payload.full_name != null) fullName.value = payload.full_name;
  if (email && payload.email != null) email.value = payload.email;
  if (language && payload.language != null) language.value = payload.language;
  if (timezone && payload.timezone != null) timezone.value = payload.timezone;

  if (payload.notifications && typeof payload.notifications === "object") {
    Object.keys(payload.notifications).forEach(function (key) {
      const toggle = document.querySelector('[data-setting="' + key + '"]');
      if (!toggle) return;

      const shouldEnable = Boolean(payload.notifications[key]);
      toggle.classList.toggle("on", shouldEnable);
    });
  }
}

function showToast(message, type) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  const tone = type || "success";

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

  setTimeout(function () {
    toast.classList.add("opacity-0", "translate-y-10");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 2500);
}

(function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (button) {
        button.classList.remove("tab-active");
      });

      panels.forEach(function (panel) {
        panel.classList.add("hidden");
      });

      tab.classList.add("tab-active");
      const targetPanel = document.getElementById("panel-" + tab.dataset.tab);
      if (targetPanel) targetPanel.classList.remove("hidden");
    });
  });
})();

window.SettingsPage = {
  getPayload: getSettingsPayload,
  hydrate: hydrateSettings,
  getNotificationSettings: getNotificationSettings,
  saveProfile: saveProfile,
  savePassword: savePassword,
  cancelPasswordForm: cancelPasswordForm
};
