import { Bell, Shield, User } from "lucide-react";

export type NavItem = {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  link: string;
};

export const SETTINGS_PAGES: Record<string, NavItem> = {
  profile: {
    key: "profile",
    label: "Profile",
    description: "Manage your personal information and preferences",
    icon: User,
    link: "/settings/profile",
  },
  notification: {
    key: "notification",
    label: "Notifications",
    description: "Control how and when you receive notifications",
    icon: Bell,
    link: "/settings/notifications",
  },
  security: {
    key: "security",
    label: "Security",
    description: "Manage your password, 2FA, and account access",
    icon: Shield,
    link: "/settings/security",
  },
};
