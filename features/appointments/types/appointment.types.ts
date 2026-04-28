// ==============================
// Status & Type (Enums-like)
// ==============================
export type AppointmentStatus =
  | "upcoming"
  | "in-progress"
  | "confirmed"
  | "pending";

export type AppointmentType =
  | "Consultation"
  | "Follow-up"
  | "Video Consultation";

// ==============================
// Main Entity
// ==============================
export interface Appointment {
  id?: string;
  patientName: string;
  patientPhoto?: string;
  status: AppointmentStatus;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  notes?: string;
}

// ==============================
// Derived Props (UI Components)
// ==============================

// Details Component Props
export type AppointmentDetailsProps = Pick<
  Appointment,
  "startTime" | "endTime" | "type"
>;

// Actions Component Props

export interface AppointmentActionProps {
  id: string;
  patientName: string;
  status: AppointmentStatus;
  isVideoType?: boolean;
  allowedActions?: string[];
}


