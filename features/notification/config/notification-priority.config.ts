import { Badge } from "@/types.ts/Badge";
import { NotificationPriority } from "../types/notifications.type";

export const NotificationPriorityConfig: Record<NotificationPriority, Badge> = {
  low: { label: "Low" },
  medium: { label: "Medium" },
  high: { label: "High" },
};
