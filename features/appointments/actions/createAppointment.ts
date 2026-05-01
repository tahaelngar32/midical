"use server";

import { appointmentSchema } from "@/features/appointments/Schema/appointment.schema";
import zodErrorsToObject from "@/lib/utils/zodErrorsToObject";
import FormState from "@/types/form-state";
import { nanoid } from "nanoid";
export async function createAppointment(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const isNewPatientRaw = formData.get("isNewPatient");
  const isNewPatient =
    isNewPatientRaw === "true" ||
    isNewPatientRaw === "on" ||
    isNewPatientRaw === "1" ||
    isNewPatientRaw === "checked";

  const data = {
    isNewPatient,
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
      status: "error",
      errors: zodErrorsToObject(result.error.issues),
    };
  }

  //call service
  const id = nanoid();

  return {
    status: "success",
    id,
  };
}
