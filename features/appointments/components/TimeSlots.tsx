import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

import type { TimeSlot } from "../mock/generateTimeSlots";

export const TimeSlots: React.FC<{
  slots: TimeSlot[];
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ slots, selected, setSelected }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 py-3">
      <span className="text-sm text-muted-foreground sm:col-span-2 xl:col-span-3 font-bold">
        Time Slots
      </span>

      {slots.map((slot) => (
        <Button
          key={slot.id}
          type="button"
          disabled={slot.isBooked}
          variant="outline"
          onClick={() => {
            if (slot.isBooked) return;
            setSelected(slot.from);
          }}
          className={cn(
            slot.isBooked && "bg-muted cursor-not-allowed opacity-60",
            selected === slot.from && "bg-[#4988C4] text-white",
          )}
        >
          {slot.label}
        </Button>
      ))}
    </div>
  );
};
