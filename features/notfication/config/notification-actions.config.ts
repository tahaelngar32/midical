import { NotificationItem } from "../types/notifications.type";

export type NotificationAction = {
  key: string;
  show: (notification: NotificationItem) => boolean;
};

export const notificationActionsConfig: NotificationAction[] = [
  {
    key: "select",
    show: (n) => n.variant === "info" || n.variant === "danger",
  },
];
