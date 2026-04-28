import { z } from "zod";

export const appointmentSchema = z
  .object({
    isNewPatient: z.boolean().optional(),

    patientId: z.string().optional(),
    patientName: z.string().optional(),

    appointmentType: z.string().min(1, "Appointment type is required"),

    note: z.string().optional(),

    age: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined))
      .refine((val) => val === undefined || val > 0, {
        message: "Age must be positive",
      }),

    from: z.string().min(1, "Time slot is required"),

    date: z.string().min(1, "Date is required"),
  })
  .refine(
    (data) => {
      if (data.isNewPatient) {
        return !!data.patientName;
      }
      return !!data.patientId;
    },
    {
      message: "Patient is required",
      path: ["patientId"],
    },
  )
  .refine(
    (data) => {
      // منع إن الاتنين يتبعتوا مع بعض (optional but recommended)
      return !(data.patientId && data.patientName);
    },
    {
      message: "Choose either existing patient or new patient",
      path: ["patientId"],
    },
  );
