"use server";

import FormState from "@/types/form-state";
import { schedulingAppointmentSchema } from "../schema/scheduling-appointment.schema";
import zodErrorsToObject from "@/lib/utils/zodErrorsToObject";
import { nanoid } from "nanoid";

export async function createSchedulingAppointment(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = {
    date: formData.get("date")?.toString() || undefined,
    from: formData.get("from")?.toString() || undefined,
    to: formData.get("to")?.toString() || undefined,
    duration: formData.get("duration")?.toString() || undefined,
  };

  const result = schedulingAppointmentSchema.safeParse(data);

  if (!result.success) {
    return {
      status: "error",
      errors: zodErrorsToObject(result.error.issues),
    };
  }

  // call service
  const id = nanoid();

  return {
    status: "success",
    id,
  };
}
