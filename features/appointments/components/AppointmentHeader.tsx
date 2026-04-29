"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/PageHeader";
import { Plus } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { CreateNewAppointmentForm } from "./CreateAppointmentForm";

export function AppointmentHeader() {
  return (
    <Dialog>
      <PageHeader
        title="Appointments"
        description="Manage your Appointments"
        action={
          <DialogTrigger asChild>
            <ActionButton
              label="Create New Appointment"
              icon={<Plus className="size-4" />}
            />
          </DialogTrigger>
        }
      />

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto rounded-xl px-4 py-5 sm:px-10 sm:py-9">
        <DialogHeader className="gap-0">
          <DialogTitle className="text-lg font-semibold">
            Create New Appointment
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Enter appointment information to create a new record
          </DialogDescription>
        </DialogHeader>
        <CreateNewAppointmentForm />
      </DialogContent>
    </Dialog>
  );
}
