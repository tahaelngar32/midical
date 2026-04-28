import { AppointmentType } from "../types/appointment.types";
import { Video, Stethoscope, RefreshCcw } from "lucide-react";

export type AppointmentTypeMeta = {
  label: string;
  icon: any;
};

export const appointmentTypeConfig: Record<
  AppointmentType,
  AppointmentTypeMeta
> = {
  Consultation: {
    label: "Consultation",
    icon: Stethoscope,
  },
  "Follow-up": {
    label: "Follow-up",
    icon: RefreshCcw,
  },
  "Video Consultation": {
    label: "Video Consultation",
    icon: Video,
  },
};

export const appointmentTypeOptions = Object.keys(
  appointmentTypeConfig,
) as AppointmentType[];