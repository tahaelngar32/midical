import { MessageSquare, Pencil, Phone, Video } from "lucide-react";
import { AppointmentActionProps } from "../types/appointment.types";
import type { ElementType } from "react";

export type ActionItem = {
  key: string;
  label: string;
  icon: ElementType;
  variant?: "default" | "outline";
  className?: string;
  show: (ctx: AppointmentActionProps) => boolean;
};

export const actionsConfig: ActionItem[] = [
  {
    key: "join-call",
    label: "Join Call",
    icon: Video,
    className: "bg-[#4988C4] text-white",
    show: ({ status }) => status === "in-progress",
  },
  {
    key: "start-call",
    label: "Start Call",
    icon: Video,
    variant: "outline",
    show: ({ status, isVideoType }) => status === "confirmed" && !!isVideoType,
  },
  {
    key: "call",
    label: "Call",
    icon: Phone,
    variant: "outline",
    show: () => true,
  },
  {
    key: "message",
    label: "Message",
    icon: MessageSquare,
    variant: "outline",
    show: () => true,
  },
  {
    key: "edit",
    label: "Edit",
    icon: Pencil,
    variant: "outline",
    show: () => true,
  },
];
