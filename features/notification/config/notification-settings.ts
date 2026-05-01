import { NotificationSetting } from "../types/notifications.type";

export const notificationSettings: NotificationSetting[] = [
  {
    key: "security_alerts",
    title: "Security Alerts",
    description: "Important alerts about your account security",
    isActive: true,
  },
  {
    key: "email_notifications",
    title: "Email Notifications",
    description: "Receive appointment confirmations via email",
    isActive: false,
  },
  {
    key: "appointments_updates",
    title: "Appointment Updates",
    description: "Updates about your appointments",
    isActive: true,
  },
  {
    key: "marketing_emails",
    title: "Marketing Emails",
    description: "Receive updates about new features and offers",
    isActive: true,
  },
  {
    key: "system_updates",
    title: "System Updates",
    description: "Notifications about system maintenance and updates",
    isActive: true,
  },
];
