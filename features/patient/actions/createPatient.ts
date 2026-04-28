"use server";

import { patientSchema } from "@/features/patient/Schema/patientSchema";
import zodErrorsToObject from "@/lib/utils/zodErrorsToObject";
type FormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};
export async function createPatient(prevState: FormState | null, formData: FormData) {
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
    console.log(zodErrorsToObject(result.error.issues));

    return {
      errors: zodErrorsToObject(result.error.issues),
    };
  }
  //DB logic

  return { success: true };
}
