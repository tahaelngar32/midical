"use server";

import { appointmentSchema } from "@/features/appointments/Schema/appointmentSchema";
import zodErrorsToObject from "@/lib/utils/zodErrorsToObject";

type FormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export async function createAppointment(
  prevState: FormState | null,
  formData: FormData,
) {
  const data = {
    patientId: formData.get("patientId")?.toString() || undefined,
    patientName: formData.get("patientName")?.toString() || undefined,
    appointmentType: formData.get("appointmentType")?.toString() || "",
    note: formData.get("note")?.toString() || undefined,
    age: formData.get("age") ? Number(formData.get("age")) : undefined,
    from: formData.get("from")?.toString() || "",
    date: formData.get("date")?.toString() || "",
  };

  const result = appointmentSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: zodErrorsToObject(result.error.issues),
    };
  }

  //call service

  return {
    success: true,
  };
}
