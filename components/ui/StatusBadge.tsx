import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

export const StatusBadge = ({
  status,
  config,
  className: statusClass = "",
}: {
  status: string;
  config: any;
  className?: string;
}) => {
  const item = config[status];

  if (!item) return null;

  const Icon = item.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        statusClass,
        item.className,
      )}
    >
      {Icon && <Icon size={14} />}
      {item.label}
    </span>
  );
};
