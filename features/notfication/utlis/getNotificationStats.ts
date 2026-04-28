import {
  NotificationItem,
  NotificationStats,
} from "../types/notifications.type";

export const getNotificationStats = (
  notifications: NotificationItem[],
): NotificationStats => {
  return {
    total: notifications.length,
    unread: notifications.filter((n) => !n.unread).length,
    highPriority: notifications.filter((n) => n.priority === "high").length,
    today: notifications.filter((n) => {
      const today = new Date().toDateString();
      return new Date(n.datetime).toDateString() === today;
    }).length || 0,
  };
};
