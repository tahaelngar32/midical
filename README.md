# Medical Dashboard (Frontend)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

A production-oriented **medical dashboard frontend** built with **Next.js App Router**. It’s structured around **feature modules** and a reusable UI layer to support core workflows like **appointments**, **patients**, **notifications**, **settings**, **chat**, and **video calls**.

## What’s inside ✨

- **Appointments**: view, filter, create, and manage appointment details
- **Patient management**: patient list, patient profile with nested sections (overview/medical/prescriptions/appointments)
- **Notifications**: inbox + filters, stats cards, and notification preferences
- **Settings**: profile, notifications, and security (2FA, active sessions, login history)
- **Chat**: patient list, conversations, and message composer
- **Video calls**: dedicated route for call experience

## Tech stack 🧱

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI kit**: shadcn/ui (Radix primitives) + `class-variance-authority`
- **Forms & validation**: React Hook Form + Zod
- **Icons & motion**: Lucide + GSAP
- **Notifications/toasts**: Sonner
- **Package manager**: pnpm

## Project structure 🗂️

The project follows a **feature-based architecture**: domain logic lives in `features/*` (components, hooks, types, config, actions), while shared UI stays in `components/*`.

```txt
app/                 # Next.js App Router routes, layouts, route-level UI
  _components/       # Route-level components tied to app shell/home
  appointments/      # /appointments
  patients/          # /patients + nested routes (/[id]/overview, etc.)
  notifications/     # /notifications
  settings/          # /settings + /profile, /security, /notifications
  video-calls/       # /video-calls
  @modal/            # Intercepting routes for modal-based flows

features/            # Feature modules (domain-oriented)
  appointments/      # appointment UI, actions, config, schema, types
  patient/           # patient UI, actions, config, types
  notification/      # notification UI, config, utils, mocks, types
  chat/              # chat UI + hooks + mock data
  security/          # session + 2FA + password + login history modules
  doctor-profile/    # profile settings + hooks + types
  scheduling/        # scheduling UI + schema + mocks

components/          # Shared components (app shell, layout, reusable UI)
  ui/                # shadcn/ui components (button, dialog, tabs, etc.)

lib/                 # Shared utilities (e.g., zod helpers, general utils)
hooks/               # Cross-feature hooks (routing, media, toast helpers)
public/              # Static assets
types/               # Shared TypeScript types
```

## Getting started 🚀

### Prerequisites

- **Node.js** (recommended: latest LTS)
- **pnpm**

### Install & run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment variables 🔐

This app is frontend-first and may run without env vars for UI development, but real integrations (API, auth, video) should be configured via `.env.local`.

Create `.env.local`:

```bash
# API
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"

# Auth (example)
NEXT_PUBLIC_AUTH_PROVIDER="local"

# Video calls (example)
NEXT_PUBLIC_VIDEO_PROVIDER="daily"
NEXT_PUBLIC_VIDEO_API_KEY="__REPLACE_ME__"
```

Notes:
- Use `NEXT_PUBLIC_` only for values safe to expose in the browser.
- Keep secrets server-side when backend routes are introduced.

## Scripts 📜

```bash
pnpm dev      # Start Next.js dev server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## UI/UX notes 🎛️

- **Reusable UI primitives** live in `components/ui/*` (shadcn/ui), keeping interaction patterns consistent across features.
- **Feature boundaries** are enforced by colocating feature-specific hooks, types, configs, and actions under `features/*`.
- **Scalability**: new domains (e.g., billing, lab results) should be added as new `features/<domain>` modules + route entrypoints in `app/`.

## Best practices used ✅

- **App Router conventions**: route-level layouts, nested routes for patient profiles, intercepting routes for modals
- **Separation of concerns**: shared UI vs domain features vs route composition
- **Type-safe validation**: Zod schemas near the feature that owns them
- **Composable styling**: Tailwind + `cva` + `tailwind-merge` for consistent variants



## Future improvements 🧭

- **API integration layer**: typed client + error boundaries + caching strategy
- **Auth & RBAC**: role-based routing and permissioned UI states
- **Video calls**: provider-backed session creation + device checks + reconnection UX
- **Testing**: unit + component tests (and basic e2e for critical flows)
- **Observability**: client-side error reporting + performance monitoring

---

### Quick links

- Routes: `app/appointments`, `app/patients`, `app/notifications`, `app/settings`, `app/video-calls`, `app/chat`
- Feature modules: `features/appointments`, `features/patient`, `features/notification`, `features/security`, `features/chat`
