import { statusConfig } from "@/features/appointments/config/appointment-status.config";
import { cn } from "@/lib/utils/cn";
import { AppointmentStatus } from "../types/appointment.types";

interface StatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const {
    label,
    className: statusClass = "",
    icon: Icon,
  } = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        statusClass,
        className,
      )}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
};
