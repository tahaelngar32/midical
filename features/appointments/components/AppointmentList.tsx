import { styledList } from "@/lib/utils/layout";
import React from "react";
import { Appointment } from "../types/appointment.types";
import { AppointmentCard } from "./AppointmentCard";
import App from "next/app";

export const AppointmentList: React.FC<{ appointments: Appointment[] }> = ({
  appointments=[],
}) => {
  return (
    <ul className={styledList()}>
      {appointments.map((appointment) => (
        <AppointmentCard appointment={appointment} key={appointment.id} />
      ))}
    </ul>
  );
};
