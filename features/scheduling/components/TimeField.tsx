import { format, parse } from "date-fns";
import { Clock } from "lucide-react";

export const TimeField = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const formattedTime = parse(value, "HH:mm", new Date());
  return (
    <div className="flex flex-col gap-0.5 flex-1">
      <span className="text-[11px] uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      <span className="flex items-center gap-1 text-[15px] font-medium text-neutral-800 dark:text-neutral-200">
        <Clock size={14} className="shrink-0 text-neutral-400" />
        {format(formattedTime, "h:mm a")}
      </span>
    </div>
  );
};
