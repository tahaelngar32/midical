import SchedulingAppointmentHeader from "@/features/scheduling/components/SchedulingAppointmentHeader";
import SchedulingAppointmentList from "@/features/scheduling/components/SchedulingAppointmentList";
import SchedulingAppointmentSection from "@/features/scheduling/components/SchedulingAppointmentSection";

import React from "react";

const Page = () => {
  return (
    <>
      <SchedulingAppointmentHeader />
      <SchedulingAppointmentSection />
      <SchedulingAppointmentList />
    </>
  );
};

export default Page;
