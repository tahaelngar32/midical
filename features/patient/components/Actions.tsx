import { Button } from "@/components/ui/button";
import { flexRow } from "@/lib/utils/layout";
import { Calendar, Eye, File } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Actions: React.FC<{ id: string; patientName: string }> = ({
  patientName,

  id,
}) => {
  return (
    <div
      className={flexRow()}
      role="group"
      aria-label={`Actions for ${patientName} appointment`}
    >
      <Button
        size={"sm"}
        variant={"outline"}
        aria-label="schedule an appointment"
      >
        <Calendar className="size-4" aria-hidden /> <span>Schedule</span>
      </Button>
      <Button
        size={"sm"}
        variant={"outline"}
        aria-label={`show Prescribe for ${patientName}`}
      >
        <File className="size-4" aria-hidden /> <span>Prescribe</span>
      </Button>

      <Button
        size={"icon"}
        variant={"outline"}
        aria-label={`over view about ${patientName}`}
        asChild
      >
        <Link href="/patients/1/overview">
          <Eye className="size-4" aria-hidden />
        </Link>
      </Button>
    </div>
  );
};
