<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>@yield('title', 'ClinicFlow Dashboard')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('assets/css/dashboard.css') }}" />
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ["Plus Jakarta Sans", "sans-serif"]
                    },
                    boxShadow: {
                        soft: "0 10px 30px rgba(15, 23, 42, 0.08)"
                    }
                }
            }
        };
    </script>
</head>

<body class="bg-slate-50 text-slate-800" data-active-view="@yield('active_view', 'dashboard')">

    <div class="dashboard-shell">
        <div id="overlay" class="fixed inset-0 z-30 hidden bg-slate-950/30 lg:hidden" onclick="closeSidebar()"></div>

        <aside id="sidebar"
            class="sidebar-panel fixed left-0 top-0 z-40 h-screen w-[250px] -translate-x-full lg:translate-x-0">
            <div class="flex items-center gap-3 border-b border-slate-100 px-5 py-6">
                <div class="grid h-9 w-9 place-items-center rounded-xl bg-slate-700 text-sm font-bold text-white">T
                </div>
                <div class="text-xl font-semibold text-slate-900">ClinicFlow</div>
                <button onclick="closeSidebar()" class="ml-auto text-slate-500 lg:hidden">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

      <nav class="px-3 py-4">
        <a href="{{ route('dashboard') }}" class="side-link {{ request()->routeIs('dashboard') ? 'side-link-active' : '' }}">
          <i class="bi bi-bar-chart-line"></i><span>Dashboard</span>
        </a>
        <a href="{{ route('appointments.index') }}" class="side-link {{ request()->routeIs('appointments.index') ? 'side-link-active' : '' }}">
          <i class="bi bi-calendar3"></i><span>Appointments</span>
        </a>
        <a href="{{ route('schedule.index') }}" class="side-link {{ request()->routeIs('schedule.index') ? 'side-link-active' : '' }}">
          <i class="bi bi-calendar-week"></i><span>Schedule Management</span>
        </a>
        <a href="{{ route('patients.index') }}" class="side-link {{ request()->routeIs('patients.index') ? 'side-link-active' : '' }}">
          <i class="bi bi-people"></i><span>Patients</span>
        </a>
        <a href="{{ route('patients.create') }}" class="side-link {{ request()->routeIs('patients.create') ? 'side-link-active' : '' }}">
          <i class="bi bi-person-plus"></i><span>Add Patient</span>
        </a>
        <a href="{{ route('settings') }}" class="side-link {{ request()->routeIs('settings') ? 'side-link-active' : '' }}">
          <i class="bi bi-gear"></i><span>Settings</span>
        </a>
        <a href="{{ route('notifications.index') }}" class="side-link relative {{ request()->routeIs('notifications.index') ? 'side-link-active' : '' }}">
          <i class="bi bi-bell"></i><span>Notifications</span>
          <span class="notice-badge">5</span>
        </a>
      </nav>
    </aside>

        <main class="main-panel min-h-screen lg:ml-[250px]">
            <div class="content-wrap px-4 py-4 sm:px-5 lg:px-6 lg:py-6">

                <header class="topbar-card mb-3 flex flex-wrap items-center gap-3">
                    <button onclick="openSidebar()"
                        class="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 text-slate-700 lg:hidden">
                        <i class="bi bi-list text-lg"></i>
                    </button>
                    <h1 class="text-[15px] font-bold text-slate-900">@yield('page_title', 'Dashboard')</h1>
                    <div class="ml-auto flex w-full items-center gap-3 sm:w-auto">
                        <label class="search-field flex-1 sm:w-[330px]">
                            <i class="bi bi-search text-slate-400"></i>
                            <input id="searchInput" type="text" placeholder="Search patients, appointments..." />
                        </label>
                        <button class="relative text-slate-700" onclick="showToast('Notifications opened')">
                            <i class="bi bi-bell text-lg"></i>
                            <span class="top-badge">5</span>
                        </button>
                        <div class="relative" id="profileMenuWrap">
                            <button class="doctor-avatar" aria-label="Doctor profile"
                                onclick="toggleProfileMenu(event)">
                                <img src="{{ asset('assets/img/doctor-img.png') }}" alt="Doctor profile"
                                    loading="lazy" />
                            </button>
                            <div id="profileDropdown" class="profile-dropdown hidden">
                                <a href="{{ route('settings') }}" class="profile-dropdown-item">
                                    <i class="bi bi-gear"></i> Settings
                                </a>
                                @auth
                                    <a href="#" class="profile-dropdown-item profile-dropdown-logout"
                                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                        <i class="bi bi-box-arrow-right"></i> Logout
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                        style="display: none;">
                                        @csrf
                                    </form>
                                @else
                                    <a href="{{ route('login') }}" class="profile-dropdown-item">
                                        <i class="bi bi-box-arrow-in-right"></i> Login
                                    </a>
                                @endauth
                            </div>
                        </div>
                    </div>
                </header>

                @yield('content')

            </div>
        </main>
    </div>

    <div id="toast"
        class="pointer-events-none fixed bottom-5 right-5 translate-y-10 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-300">
        Saved</div>

    <script src="{{ asset('assets/js/dashboard.js') }}"></script>
</body>

</html>
