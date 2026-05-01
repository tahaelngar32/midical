import React from "react";
import SchedulingAppointmentRow from "./SchedulingAppointmentRow";
import { styledList } from "@/lib/utils/layout";
import { Appointment } from "@/features/scheduling/types/available-appointment-types";
import { mockAvailableAppointments } from "../mock/available-appointment.mock";

const SchedulingAppointmentList = () => {
  return (
    <div className={styledList()}>
      {mockAvailableAppointments.map((item: Appointment) => (
        <SchedulingAppointmentRow key={item.date} schedulingAppointment={item} />
      ))}
    </div>
  );
};

export default SchedulingAppointmentList;
