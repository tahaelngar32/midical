import React from "react";
import { AppointmentDetailsProps } from "../types/appointment.types";
import { Clapperboard, Clock } from "lucide-react";
import { flexRow } from "@/lib/utils/layout";

export const Details: React.FC<AppointmentDetailsProps> = ({
  startTime,
  endTime,
  type,
}) => {
  return (
    <dl className={flexRow("flex-wrap pt-2 px-3")}>
      <div className={flexRow("gap-1")}>
        <dt className="sr-only">Time</dt>
        <dd className="flex items-center gap-1 font-medium text-sm leading-5 text-[#4A5565]">
          <Clock className="size-3.5" aria-hidden />
          <time dateTime={`${startTime}/${endTime}`}>
            {startTime} – {endTime}
          </time>
        </dd>
      </div>

      <div className={flexRow("gap-1")}>
        <dt className="sr-only">Type</dt>
        <dd className="flex items-center gap-1 font-normal text-sm leading-5 text-[#4A5565]">
          <Clapperboard className="size-3.5" aria-hidden />
          {type}
        </dd>
      </div>
    </dl>
  );
};
