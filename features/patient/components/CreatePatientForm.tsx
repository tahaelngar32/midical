"use client";

import React, { useEffect, useRef } from "react";
import { useActionState } from "react";
import { createPatient } from "@/features/patient/actions/createPatient";

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
import FormState from "@/types/form-state";
import { toast } from "sonner";
import useToast from "@/hooks/useSuccessToast";
import { FieldError } from "@/components/ui/filed-error";

export function CreatePatientForm() {
  const [state, formAction] = useActionState<FormState | null, FormData>(
    createPatient,
    null,
  );
  const { errors } = useToast({
    state,
    successMessage: "Patient has been created",
    errorMessage: "Failed to create a patient",
  });

  return (
    <form action={formAction}>
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
        {/* First Name */}
        <Field data-invalid={!!errors?.firstName?.[0]}>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            name="firstName"
            placeholder="Enter first name"
            aria-invalid={errors?.firstName ? true : false}
          />
          <FieldError errors={errors} name="firstName" />
        </Field>

        {/* Last Name */}
        <Field data-invalid={!!errors?.lastName?.[0]}>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            name="lastName"
            placeholder="Enter last name"
            aria-invalid={errors?.lastName ? true : false}
          />
          <FieldError errors={errors} name="lastName" />
        </Field>

        {/* Age */}
        <Field data-invalid={!!errors?.age?.[0]}>
          <Label htmlFor="age">Age</Label>
          <Input
            name="age"
            type="number"
            placeholder="Enter age"
            aria-invalid={errors?.age ? true : false}
          />
          <FieldError errors={errors} name="age" />
        </Field>

        {/* Gender */}
        <Field data-invalid={!!errors?.gender?.[0]}>
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender">
            <SelectTrigger
              className="w-full"
              aria-invalid={errors?.gender ? true : false}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError errors={errors} name="gender" />
        </Field>

        {/* Blood Type */}
        <Field data-invalid={!!errors?.bloodType?.[0]}>
          <Label htmlFor="bloodType">Blood Type</Label>
          <Select name="bloodType">
            <SelectTrigger
              className="w-full"
              aria-invalid={errors?.bloodType ? true : false}
            >
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError errors={errors} name="bloodType" />
        </Field>

        {/* Phone */}
        <Field data-invalid={!!errors?.phone?.[0]}>
          <Label htmlFor="phone">Phone</Label>
          <Input
            name="phone"
            placeholder="+201 934 567890"
            type="tel"
            aria-invalid={errors?.phone ? true : false}
          />
          <FieldError errors={errors} name="phone" />
        </Field>

        {/* Email */}
        <Field className="sm:col-span-2" data-invalid={!!errors?.email?.[0]}>
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="ali@gmail.com"
            name="email"
            type="email"
            aria-invalid={errors?.email ? true : false}
          />
          <FieldError errors={errors} name="email" />
        </Field>

        {/* Address */}
        <Field className="sm:col-span-2" data-invalid={!!errors?.address?.[0]}>
          <Label htmlFor="address">Address</Label>
          <Input
            placeholder="enter your address"
            name="address"
            aria-invalid={errors?.address ? true : false}
          />
          <FieldError errors={errors} name="address" />
        </Field>

        {/* Emergency */}
        <Field className="sm:col-span-2" data-invalid={!!errors?.emergency?.[0]}>
          <Label htmlFor="emergency">Emergency Contact</Label>
          <Input
            name="emergency"
            aria-invalid={errors?.emergency ? true : false}
          />
          <FieldError errors={errors} name="emergency" />
        </Field>
      </FieldGroup>

      <DialogFooter className="bg-transparent border-t-0">
        <Button type="submit" className="bg-[#4988C4]">
          Add Patient
        </Button>

        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
