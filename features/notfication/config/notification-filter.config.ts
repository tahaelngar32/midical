import {
  NotificationFilter,
  NotificationFilterOption,
} from "../types/notifications.type";

export const notificationFilterOptions: NotificationFilterOption[] = [
  {
    value: "all-notification",
    label: "All Notification",
  },
  {
    value: "upcoming-notification",
    label: "Upcoming Notification",
  },
  {
    value: "prescription-notification",
    label: "Prescription Notification",
  },
  {
    value: "security-notification",
    label: "Security Notification",
  },
];

export const DEFAULT_FILTER: NotificationFilter = "all-notification";
