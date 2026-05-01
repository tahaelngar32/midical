"use client";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
;
import { PageHeader } from "@/components/PageHeader";
import { Plus } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";

import { CreatePatientForm } from "./CreatePatientForm";

import React from 'react'


export function PatientHeader() {
  return (
    <Dialog>
      <PageHeader
        title="Patients"
        description="Manage your patients"
        action={
          <DialogTrigger asChild>
            <ActionButton
              label="Add new patient"
              icon={<Plus className="size-4" />}
            />
          </DialogTrigger>
        }
      />

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto rounded-xl px-4 py-5 sm:px-10 sm:py-9">
        <DialogHeader className="gap-0">
          <DialogTitle className="text-lg font-semibold">
            Add New Patient
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Enter patient information to create a new record
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <CreatePatientForm />
      </DialogContent>
    </Dialog>
  );
}
