import { ClipboardClock, Pill, ShieldCheck } from "lucide-react";
import { NotificationType } from "../types/notifications.type";

export const NotificationTypeConfig: Record<
  NotificationType,
  { label: string; className: string; icon?: React.ElementType }
> = {
  security: {
    label: "Security",
    className: ` bg-gray-100 text-gray-700 border-gray-200`,
    icon: ShieldCheck,
  },
  appointment: {
    label: "Appointment",
    className: ` bg-blue-100 text-blue-700 border-blue-200`,
    icon: ClipboardClock,
  },
  prescription: {
    label: "Prescription",
    className: `bg-transparent text-blue-500 border-gray-200`,
    icon: Pill,
  },
};
