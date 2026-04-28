import z from "zod";

export const patientSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),

  age: z.coerce.number("Age is required").min(0).max(150),

  gender: z.enum(["male", "female"],"Gender is required"),

  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],"Blood type is required"),

  phone: z.string().min(10, "Phone is required"),

  email: z.string().email("Invalid email").optional(),

  address: z.string().min(5, "Address is required"),

  emergency: z.string().min(5, "Emergency contact is required"),
});

export type Patient = z.infer<typeof patientSchema>;
