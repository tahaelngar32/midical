import { styledList } from "@/lib/utils/layout";
import React from "react";
import { Appointment } from "../types/appointment.types";
import { Card } from "./Card";

export const AppointmentList: React.FC<{ appointments: Appointment[] }> = ({
  appointments=[],
}) => {
  return (
    <ul className={styledList()}>
      {appointments.map((appointment) => (
        <Card appointment={appointment} key={appointment.id} />
      ))}
    </ul>
  );
};
