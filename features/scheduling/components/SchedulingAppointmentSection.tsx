import React from "react";
import SchedulingAppointmentForm from "./SchedulingAppointmentForm";
import SectionCard from "@/components/ui/SectionCard";

const SchedulingAppointmentSection = () => {
  return (
    <SectionCard title="Scheduling" subtitle="Manage your appointments">
      <SchedulingAppointmentForm />
    </SectionCard>
  );
};

export default SchedulingAppointmentSection;
