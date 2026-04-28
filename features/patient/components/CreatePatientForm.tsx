"use client";

import React from "react";
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

type FormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
} | null;

export function CreatePatientForm() {
  const [state, formAction] = useActionState<FormState, FormData>(
    createPatient,
    null,
  );

  return (
    <form action={formAction}>
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
        {/* First Name */}
        <Field>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            name="firstName"
            placeholder="Enter first name"
            aria-invalid={state?.errors?.firstName ? true : false}
          />
          {state?.errors?.firstName && (
            <p className="text-red-500 text-sm">{state.errors.firstName[0]}</p>
          )}
        </Field>

        {/* Last Name */}
        <Field>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            name="lastName"
            placeholder="Enter last name"
            aria-invalid={state?.errors?.lastName ? true : false}
          />
          {state?.errors?.lastName && (
            <p className="text-red-500 text-sm">{state.errors.lastName[0]}</p>
          )}
        </Field>

        {/* Age */}
        <Field>
          <Label htmlFor="age">Age</Label>
          <Input
            name="age"
            type="number"
            placeholder="Enter age"
            aria-invalid={state?.errors?.age ? true : false}
          />
          {state?.errors?.age && (
            <p className="text-red-500 text-sm">{state.errors.age[0]}</p>
          )}
        </Field>

        {/* Gender */}
        <Field>
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender">
            <SelectTrigger
              className="w-full"
              aria-invalid={state?.errors?.gender ? true : false}
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
          {state?.errors?.gender && (
            <p className="text-red-500 text-sm">{state.errors.gender[0]}</p>
          )}
        </Field>

        {/* Blood Type */}
        <Field>
          <Label htmlFor="bloodType">Blood Type</Label>
          <Select name="bloodType">
            <SelectTrigger
              className="w-full"
              aria-invalid={state?.errors?.bloodType ? true : false}
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
          {state?.errors?.bloodType && (
            <p className="text-red-500 text-sm">{state.errors.bloodType[0]}</p>
          )}
        </Field>

        {/* Phone */}
        <Field>
          <Label htmlFor="phone">Phone</Label>
          <Input
            name="phone"
            placeholder="+201 934 567890"
            type="tel"
            aria-invalid={state?.errors?.phone ? true : false}
          />
          {state?.errors?.phone && (
            <p className="text-red-500 text-sm">{state.errors.phone[0]}</p>
          )}
        </Field>

        {/* Email */}
        <Field className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
          placeholder="ali@gmail.com"
            name="email"
            type="email"
            aria-invalid={state?.errors?.email ? true : false}
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
          )}
        </Field>

        {/* Address */}
        <Field className="sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
          placeholder="enter your address"
            name="address"
            aria-invalid={state?.errors?.address ? true : false}
          />
          {state?.errors?.address && (
            <p className="text-red-500 text-sm">{state.errors.address[0]}</p>
          )}
        </Field>

        {/* Emergency */}
        <Field className="sm:col-span-2">
          <Label htmlFor="emergency">Emergency Contact</Label>
          <Input
            name="emergency"
            aria-invalid={state?.errors?.emergency ? true : false}
          />
          {state?.errors?.emergency && (
            <p className="text-red-500 text-sm">{state.errors.emergency[0]}</p>
          )}
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
