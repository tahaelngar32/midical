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
  .superRefine((data, ctx) => {
    if (data.isNewPatient) {
      if (!data.patientName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Patient is required",
          path: ["patientName"],
        });
      }
    } else {
      if (!data.patientId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Patient is required",
          path: ["patientId"],
        });
      }
    }

    // prevent both fields at the same time
    if (data.patientId && data.patientName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Choose either existing patient or new patient",
        path: ["patientId", "patientName"],
      });
    }
  });
