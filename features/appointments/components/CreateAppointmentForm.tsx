"use client";

import { useState } from "react";
import { useActionState } from "react";

import { createAppointment } from "@/features/appointments/actions/createAppointment";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

import { appointmentTypeConfig } from "../config/appointment-type.config";
import { generateTimeSlots } from "../mock/generateTimeSlots";
import { flexRow } from "@/lib/utils/layout";
import { TimeSlots } from "./TimeSlots";
import DateInput from "@/components/ui/dateInput";

type FormErrors = Record<string, string[]>;

function FieldError({
  errors,
  name,
}: {
  errors?: FormErrors;
  name: string;
}) {
  const error = errors?.[name];
  return error ? <p className="text-red-500 text-sm">{error[0]}</p> : null;
}

export function CreateNewAppointmentForm() {
  const [state, formAction] = useActionState(createAppointment, null);
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const slots = generateTimeSlots("10:00", "14:00", 15);

  const patients = [
    { id: "p1", name: "Ahmed Hassan" },
    { id: "p2", name: "Mohamed Ali" },
    { id: "p3", name: "Omar Khaled" },
    { id: "p4", name: "Youssef Mahmoud" },
  ];
  const errors = state?.errors;

  return (
    <div>
      {/* Checkbox */}
      <FieldGroup className={flexRow("gap-2 py-2")}>
        <Field
          orientation="horizontal"
          className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center"
        >
          <Checkbox
            id="isNewPatient"
            name="isNewPatient"
            checked={isNewPatient}
            onCheckedChange={(val) => {
              const next = !!val;
              setIsNewPatient(next);
              // Reset selected slot when switching patient mode
              setSelected(null);
            }}
            className="mb-1 size-5"
          />
          <Label htmlFor="isNewPatient">Is New Patient</Label>
        </Field>
      </FieldGroup>

      <form action={formAction}>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
          {/* Patient Name */}
          {isNewPatient ? (
            <Field>
              <Label>Patient Name</Label>
              <Input name="patientName" placeholder="Enter patient name" />
              <FieldError errors={errors} name="patientId" />
            </Field>
          ) : (
            <Field>
              <Label>Patient Name</Label>

              <Select name="patientId">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select patient name" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FieldError errors={errors} name="patientId" />
            </Field>
          )}

          {/* Appointment Type */}
          <Field>
            <Label>Appointment Type</Label>

            <Select name="appointmentType">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {Object.entries(appointmentTypeConfig).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      <span>{value.label}</span> <value.icon />
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FieldError errors={errors} name="appointmentType" />
          </Field>

          {/* Note */}
          <Field>
            <Label>Note</Label>
            <Input name="note" placeholder="Optional note" />
            <FieldError errors={errors} name="note" />
          </Field>

          {/* Date */}
          <DateInput>
            <FieldError errors={errors} name="date" />
          </DateInput>

          {/* hidden slot */}
          <input type="hidden" name="from" value={selected ?? ""} />
        </FieldGroup>

        {/* Time Slots */}
        <TimeSlots
          slots={slots}
          selected={selected}
          setSelected={setSelected}
        />

        {/* slot error */}
        <FieldError errors={errors} name="from" />

        {/* Footer */}
        <DialogFooter className="bg-transparent border-t-0">
          <Button type="submit" disabled={!selected} className="bg-[#4988C4]">
            Add Appointment
          </Button>

          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </div>
  );
}
