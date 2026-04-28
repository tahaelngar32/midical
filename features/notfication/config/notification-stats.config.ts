import { NotificationStats } from "../types/notifications.type";

const NotificationStatsConfig: Record<
  keyof NotificationStats,
  { key: string; label: string; className: string; src: string }
> = {
  total: {
    key: "total",
    label: "Total",
    className: "text-[#101828]",
    src: "/image 13.png",
  },
  unread: {
    key: "unread",
    label: "Unread",
    className: "text-[#E7000B]",
    src: "/image 12.png",
  },
  highPriority: {
    key: "highPriority",
    label: "High Priority",
    className: "text-[#4988C4]",
    src: "/image 11.png",
  },
  today: {
    key: "today",
    label: "Today",
    className: "text-[#4988C4]",
    src: "/image 10.png",
  },
};

export default NotificationStatsConfig;
