import {
  Calendar,
  CalendarCheck,
  File,
  LayoutDashboard,
  MessageSquare,
  Pill,
  Settings,
  User2,
  Video,
} from "lucide-react";
export const sidebarLinks = [
  { label: "Dashboard", icon: LayoutDashboard, url: "/", active: "dashboard" },
  {
    label: "Appointments",
    icon: CalendarCheck,

    url: "/appointments",
    active: "appointments",
  },
  {
    label: "Schedule Appointments",
    icon: Calendar,

    url: "/schedule-appointments",
    active: "schedule-appointments",
  },
  {
    label: "Video Calls",
    icon: Video,
    url: "/video-calls",
    active: "video-calls",
  },
  {
    label: "Chats",
    icon: MessageSquare,
    url: "/chat",
    active: "chat",
  },
  { label: "Patients", icon: User2, url: "/patients", active: "patients" },
  { label: "Records", icon: File, url: "/records", active: "records" },
  {
    label: "Prescriptions",
    icon: Pill,
    url: "/prescriptions",
    active: "prescriptions",
  },
  { label: "Settings", icon: Settings, url: "/settings", active: "settings" },
] as const;
