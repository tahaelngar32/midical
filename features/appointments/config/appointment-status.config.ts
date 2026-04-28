import { CheckCircle, Clock, Hourglass, Loader } from "lucide-react";
import { AppointmentStatus } from "../types/appointment.types";
import { Badge } from "@/types.ts/Badge";

const statusStyles = {
  warning: "bg-[#fef3c7] text-[#b45309]",
  success: "bg-green-100 text-green-700",
  info: "bg-blue-100 text-blue-700",
};

export const statusConfig: Record<AppointmentStatus, Badge> = {
  upcoming: {
    label: "Upcoming",
    className: statusStyles.info,
    icon: Clock,
  },
  "in-progress": {
    label: "In Progress",
    className: statusStyles.warning,
    icon: Loader,
  },
  pending: {
    label: "Pending",
    className: statusStyles.warning,
    icon: Hourglass,
  },
  confirmed: {
    label: "Confirmed",
    className: statusStyles.success,
    icon: CheckCircle,
  },
};
