"use client";

import * as React from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useQueryParams from "@/hooks/useQueryParam";
import { Field, FieldLabel } from "./field";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { flexRow } from "@/lib/utils/layout";

type DateInputProps = {
  isAppointment?: boolean;
  showLabel?: boolean;
  hasError?: boolean;
  showDay?: boolean;
  children?: React.ReactNode;
};

export default function DateInput({
  isAppointment = false,
  showLabel = true,
  hasError = false,
  showDay = false,
  children,
}: DateInputProps) {
  const [date, setDate] = React.useState<Date | undefined>();
  const { setQueryParams } = useQueryParams();

  const day = React.useMemo(() => {
    if (!date) return "";
    return format(date, "EEEE");
  }, [date]);

  return (
    <>
      <div
        className={cn(
          flexRow("gap-2 items-start"),
          showDay && "flex-col sm:flex-row gap-2 items-start",
        )}
      >
        <input
          type="hidden"
          name="date"
          id="date"
          value={date ? format(date, "yyyy-MM-dd") : ""}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Field data-invalid={hasError}>
              {showLabel && <FieldLabel>Select Date</FieldLabel>}

              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start  sm:justify-center md:justify-start xl:justify-center",
                  showLabel && "text-left",
                  hasError && "shadow-red-500 shadow-sm",
                )}
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
              onSelect={(selectedDate) => {
                if (!selectedDate) return;

                setDate(selectedDate);

                // sync with query params if needed
                if (isAppointment) {
                  setQueryParams({
                    date: format(selectedDate, "yyyy-MM-dd"),
                  });
                }
              }}
            />
          </PopoverContent>
        </Popover>

        {showDay && (
          <Field data-invalid={hasError}>
            <FieldLabel>Day</FieldLabel>
            <Input
              readOnly
              placeholder={!date ? "Select date first" : ""}
              value={day}
              aria-invalid={hasError}
              disabled={true}
            />
          </Field>
        )}
      </div>
    </>
  );
}
