import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

// ─── Login Status Config ──────────────────────────────────────────────────────

export const loginStatusConfig = {
  success: {
    label: "Success",
    icon: CheckCircle2,
    textClass: "text-green-600 dark:text-green-400",
    iconClass: "text-green-600 dark:text-green-400",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    textClass: "text-red-600 dark:text-red-400",
    iconClass: "text-red-600 dark:text-red-400",
  },
  suspicious: {
    label: "Suspicious",
    icon: AlertCircle,
    textClass: "text-amber-600 dark:text-amber-400",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
} as const;

export type LoginStatus = keyof typeof loginStatusConfig;
