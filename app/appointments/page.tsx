import { AppointmentHeader } from "@/features/appointments/components/AppointmentHeader";
import { AppointmentList } from "@/features/appointments/components/AppointmentList";
import { AppointmentFilters } from "@/features/appointments/components/AppointmentFilters";
import { appointmentsMock } from "@/features/appointments/mock/appointments";
import App from "next/app";
import React from "react";

const Page = () => {
  return (
    <>
      <AppointmentHeader />
      <AppointmentFilters />
      <AppointmentList appointments={appointmentsMock} />
    </>
  );
};

export default Page;
