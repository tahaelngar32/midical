// ─── Doctor Profile Types ─────────────────────────────────────────────────────

export type Gender = "male" | "female" | "other" | "prefer-not";
export type Specialty =
  | "cardiology" | "neurology" | "orthopedics" | "dermatology"
  | "pediatrics" | "oncology" | "general";

export interface DoctorProfileForm {
  // Personal
  firstName: string;
  lastName: string;
  title: string;           // e.g. "MD, PhD"
  gender: Gender;
  bio: string;
  avatarUrl: string | null;

  // Professional
  specialty: Specialty;
  subSpecialty: string;
  hospital: string;
  department: string;
  experience: number;
  consultationFee: number;
  specializations: string[];  // tags

  // Contact
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;

  // Languages
  languages: string[];

  // Availability
  workingDays: string[];     // e.g. ["Mon","Tue","Wed"]
  startTime: string;         // "09:00"
  endTime: string;           // "17:00"

  // Visibility
  acceptingPatients: boolean;
  showPhone: boolean;
  showFee: boolean;
  videoCallsEnabled: boolean;
}

// Default / initial values
export const defaultDoctorProfile: DoctorProfileForm = {
  firstName: "Adam",
  lastName: "Wilson",
  title: "MD, PhD, FACC",
  gender: "male",
  bio: "Board-certified cardiologist with over 12 years of experience in interventional cardiology. Specializing in complex coronary interventions, structural heart disease, and preventive cardiology.",
  avatarUrl: null,
  specialty: "cardiology",
  subSpecialty: "Interventional Cardiology",
  hospital: "Cairo Medical Center",
  department: "Cardiovascular Department",
  experience: 12,
  consultationFee: 120,
  specializations: [
    "Coronary Angioplasty",
    "Heart Failure Management",
    "Echocardiography",
    "Preventive Cardiology",
  ],
  email: "dr.wilson@cairomed.com",
  phone: "+20 100 123 4567",
  country: "eg",
  city: "Cairo",
  address: "15 Tahrir Square, Downtown Cairo, Egypt",
  languages: ["English", "Arabic"],
  workingDays: ["Mon", "Tue", "Wed", "Thu"],
  startTime: "09:00",
  endTime: "17:00",
  acceptingPatients: true,
  showPhone: false,
  showFee: true,
  videoCallsEnabled: true,
};
