import { NotificationVariant } from "../types/notifications.type";

export const notificationVariantConfig: Record<NotificationVariant, string> = {
  danger: "bg-red-50  border-l-4 border-red-500",
  info: "bg-blue-50 border-l-4 border-blue-500",
  default: "bg-white border-l-4 border-gray-200",
};
