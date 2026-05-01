"use server";

import { patientSchema } from "@/features/patient/Schema/patientSchema";
import zodErrorsToObject from "@/lib/utils/zodErrorsToObject";
import FormState from "@/types/form-state";
import { nanoid } from "nanoid";

export async function createPatient(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    age: Number(formData.get("age")),
    gender: formData.get("gender"),
    bloodType: formData.get("bloodType"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    emergency: formData.get("emergency"),
    email: formData.get("email"),
  };

  const result = patientSchema.safeParse(data);

  if (!result.success) {
    return {
      status: "error",
      errors: zodErrorsToObject(result.error.issues),
    };
  }
  //DB logic
  const id = nanoid();
  return { status: "success", id };
}
