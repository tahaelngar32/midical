import React from "react";
import { Appointment } from "../types/appointment.types";
import { Row } from "@/components/Row";
import { AppointmentActions } from "./AppointmentActions";
import { Info } from "./Info";

interface Props {
  appointment: Appointment;
  onCall?: (id: string) => void;
  onMessage?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onJoinCall?: (id: string) => void;
  onStartCall?: (id: string) => void;
}

export const Card: React.FC<Props> = ({ appointment }) => {
  const {
    patientName,

    status,

    type,
    id,
  } = appointment;

  const isVideoType = type === "Video Consultation";

  return (
    <li className="bg-white">
      <Row
        as={"article"}
        aria-label={`Appointment with ${status} — ${patientName}`}
        className="items-start"
      >
        <Row.Left>
          <Info appointment={appointment} />
        </Row.Left>
        <Row.Right className="pl-14">
          <AppointmentActions
            patientName={patientName}
            isVideoType={isVideoType}
            status={status}
            id={`${id}`}
          />
        </Row.Right>
      </Row>
    </li>
  );
};
