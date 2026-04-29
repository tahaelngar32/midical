import {
  NotificationItem,
  NotificationStats,
} from "../types/notifications.type";

export const getNotificationStats = (
  notifications: NotificationItem[],
): NotificationStats => {
  const today = new Date().toDateString();

  return {
    total: notifications.length,
    unread: notifications.filter((n) => n.unread).length,
    highPriority: notifications.filter((n) => n.priority === "high").length,
    today: notifications.filter((n) => new Date(n.datetime).toDateString() === today)
      .length,
  };
};
