<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login - ClinicFlow</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ asset('assets/css/login.css') }}" />
</head>
<body>
  <main class="login-shell">
    <section class="login-illustration" aria-hidden="true">
      <div class="illustration-frame">
        <img src="{{ asset('assets/img/login-img.png') }}" alt="" loading="lazy" />
      </div>
    </section>

    <section class="login-panel-wrap">
      <div class="login-panel">
        <div class="brand-badge">T</div>
        <h1>Welcome Back</h1>
        <p class="subtitle">Sign in to your medical portal account</p>

        <form class="login-form" method="POST" action="#" onsubmit="event.preventDefault();">
          <label for="email">Email Address</label>
          <div class="input-row">
            <i class="bi bi-envelope"></i>
            <input id="email" type="email" placeholder="doctor@hospital.com" autocomplete="email" required />
          </div>

          <label for="password">Password</label>
          <div class="input-row">
            <i class="bi bi-lock"></i>
            <input id="password" type="password" placeholder="Enter your password" autocomplete="current-password" required />
            <button class="toggle-password" type="button" aria-label="Toggle password" onclick="togglePassword()">
              <i id="eyeIcon" class="bi bi-eye"></i>
            </button>
          </div>

          <div class="form-meta">
            <label class="remember-line" for="rememberMe">
              <input id="rememberMe" type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>

          <button class="sign-in-btn" type="submit">Sign In</button>
        </form>

        <p class="support-text">
          Need help accessing your account?
          <a href="#">Contact IT Support</a>
        </p>
      </div>

      <!-- <p class="legal-note">
        This system contains confidential patient information.<br />
        Unauthorized access is prohibited and may be subject to criminal prosecution.
      </p> -->
    </section>
  </main>

  <script>
    function togglePassword() {
      const password = document.getElementById('password');
      const eyeIcon = document.getElementById('eyeIcon');
      if (!password || !eyeIcon) return;

      const hidden = password.type === 'password';
      password.type = hidden ? 'text' : 'password';
      eyeIcon.className = hidden ? 'bi bi-eye-slash' : 'bi bi-eye';
    }
  </script>
</body>
</html>
