"use client";
import React, { useActionState, useEffect, useRef } from "react";
import { createSchedulingAppointment } from "../Actions/create-scheduling-appointment";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import DateInput from "@/components/ui/dateInput";
import FormState from "@/types/form-state";
import { FieldError } from "@/components/ui/filed-error";
import { Button } from "@/components/ui/button";
import { flexRow } from "@/lib/utils/layout";
import { toast } from "sonner";
import useToast from "@/hooks/useSuccessToast";

const SchedulingAppointmentForm = () => {
  const [state, formAction] = useActionState<FormState | null, FormData>(
    createSchedulingAppointment,
    null,
  );

  const { errors } = useToast({
    state,
    successMessage: "An appointment has been created",
    errorMessage: "Failed to create an appointment",
  });

  return (
    <form action={formAction}>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
        <DateInput hasError={!!errors?.date?.[0]} showDay showLabel>
          <FieldError errors={errors} name="date" />
        </DateInput>
        <Field data-invalid={!!errors?.duration?.[0]}>
          <FieldLabel htmlFor="duration">Duration</FieldLabel>
          <Input
            type="number"
            name="duration"
            id="duration"
            placeholder="e.g. 30"
            aria-invalid={!!errors?.duration?.[0]}
            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          <FieldError errors={errors} name="duration" />
        </Field>
        <div className={flexRow("gap-3")}>
          <Field data-invalid={!!errors?.from?.[0]}>
            <FieldLabel htmlFor="from">From</FieldLabel>
            <Input
              type="time"
              name="from"
              id="from"
              step={1}
              placeholder="hh:mm"
              aria-invalid={!!errors?.from?.[0]}
              className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <FieldError errors={errors} name="from" />
          </Field>

          <Field data-invalid={!!errors?.to?.[0]}>
            <FieldLabel htmlFor="to">To</FieldLabel>
            <Input
              type="time"
              name="to"
              id="to"
              placeholder="hh:mm"
              step={1}
              aria-invalid={!!errors?.to?.[0]}
              className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <FieldError errors={errors} name="to" />
          </Field>
        </div>
      </FieldGroup>
      <div className={flexRow("justify-end py-2")}>
        <Button type="reset" variant={"outline"} className="text-md  px-4 py-2">
          Cancel
        </Button>
        <Button
          type="submit"
          variant={"outline"}
          size={"lg"}
          className="bg-[#4988C4] text-md text-white px-4 py-2"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SchedulingAppointmentForm;
