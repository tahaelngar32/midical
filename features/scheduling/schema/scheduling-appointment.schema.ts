import { z } from "zod";


const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return +hours * 60 + minutes;
};

export const schedulingAppointmentSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    from: z.string("Invalid time format (hh:MM AM/PM)"),
    to: z.string("Invalid time format (hh:MM AM/PM)"),
    duration: z.coerce.number().min(1, "Duration is required"),
  })
  .refine((data) => toMinutes(data.from) < toMinutes(data.to), {
    message: "End time must be after start time",
    path: ["to", "from"],
  });
