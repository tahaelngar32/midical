export type PatientStatus = "active" | "inactive";

export type Gender = "male" | "female";

export type BloodType = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

export interface Patient {
  id: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  bloodType: BloodType;
  phone: string;
  email?: string;
  address: string;
  emergencyContact: string;
  status: PatientStatus;
  lastVisit: string;
}

export type Patients = Patient[];

