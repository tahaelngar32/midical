"use client";

import * as React from "react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useQueryParams from "@/hooks/useQueryParam";
import { Field, FieldLabel } from "./field";
import { cn } from "@/lib/utils/cn";

export default function DateInput({
  isAppointment = false,
  showLabel = true,
  children,
}: {
  isAppointment?: boolean;
  showLabel?: boolean;
  children?: React.ReactNode;
}) {
  const [date, setDate] = React.useState<Date | undefined>();
  const { setQueryParams } = useQueryParams();
  return (
    <>
      {/* Hidden input */}
      <input
        type="hidden"
        name="date"
        value={date ? format(date, "yyyy-MM-dd") : ""}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Field>
            {showLabel && <FieldLabel>Select Date</FieldLabel>}
            <Button
              type="button"
              variant="outline"
              className={cn(showLabel && "text-left")}
            >
              {date ? format(date, "PPP") : "Choose date"}
            </Button>
            {children}
          </Field>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              if (!date) return;
              setDate(date);
              if (!isAppointment) return;
              setQueryParams({ date: format(date, "yyyy-MM-dd") });
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
