export type NotificationType = "appointment" | "prescription" | "security";

export type NotificationPriority = "high" | "medium" | "low";

export type NotificationVariant = "danger" | "info" | "default";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  datetime: string;
  tag: NotificationType;
  priority: NotificationPriority;
  unread: boolean;
  variant: "danger" | "info" | "default";
}

export type NotificationStats = {
  total: number;
  unread: number;
  highPriority: number;
  today: number;
};

export type NotificationFilter =
  | "all-notification"
  | "upcoming-notification"
  | "prescription-notification"
  | "security-notification";

export interface NotificationFilterOption {
  value: NotificationFilter;
  label: string;
}