import { flexRow } from "@/lib/utils/layout";
import { Appointment } from "../types/appointment.types";
import { Avatar } from "@/components/Avatar";
import { StatusBadge } from "./statusBadge";
import { Details } from "./Details";
import { Notes } from "./Notes";

interface Props {
  appointment: Appointment;
}

export const Info: React.FC<Props> = ({ appointment }) => {
  const {
    patientName,
    patientPhoto,
    status,
    startTime,
    endTime,
    type,
    notes,
  } = appointment;
  return (
    <div className={flexRow("py-2")}>
      {/* Avatar */}

      <Avatar
        src={patientPhoto}
        name={patientName}
        alt={`${patientName} Pahint photo`}
      />

      <div className="leading-[1.2]">
        {/* Name + Status */}
        <div className={flexRow("px-3")}>
          <h2 className="font-semibold text-sm">{patientName}</h2>
          <StatusBadge status={status} />
        </div>

        {/* Time + Type */}
        <Details startTime={startTime} endTime={endTime} type={type} />
        {notes && <Notes notes={notes} />}
      </div>
    </div>
  );
};
