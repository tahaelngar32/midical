import { Calendar, Clock, Timer, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Appointment } from "../types/available-appointment-types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TimeField } from "./TimeField";

interface Props {
  schedulingAppointment: Appointment;
}

const SchedulingAppointmentRow = ({ schedulingAppointment }: Props) => {
  const { date, from, to, duration } = schedulingAppointment;
  const day = format(new Date(date), "EEEE");

  return (
    <li className="list-none border border-[#E5E7EB] rounded-xl p-4 bg-white hover:shadow-md hover:shadow-[#E5E7EB] transform transition duration-200 ">
      <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        {/* Left icon rail */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
            <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-h-8 w-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[17px] font-medium text-neutral-900 dark:text-neutral-100">
                {day}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {date}
              </span>
            </div>
            <span className="whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              Scheduled
            </span>
          </div>

          <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

          {/* Time */}
          <div className="flex items-center gap-2">
            <TimeField label="From" value={from} />
            <span className="mt-2.5 text-lg text-neutral-300">→</span>
            <TimeField label="To" value={to} />
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-[13px] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
              <Timer size={13} />
              {duration}
            </div>
          </div>

          <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch aria-label="Toggle appointment active" />
              <span className="text-sm text-neutral-500">Active</span>
            </div>
            <Button variant="destructive" size="icon-lg">
              <Trash2 size={13} />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SchedulingAppointmentRow;
