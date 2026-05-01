import { Badge } from "@/types/Badge";
import { PatientStatus } from "../types/patient.types";
import { Check, RotateCcw } from "lucide-react";

export const PatientStatusConfig: Record<PatientStatus, Badge> = {
  active: {
    label: "Active",
    className: "bg-green-500 text-white",
    icon: Check,
  },
  inactive: {
    label: "In-Active",
    className: "bg-muted text-muted-foreground",
    icon: RotateCcw,
  },
};
