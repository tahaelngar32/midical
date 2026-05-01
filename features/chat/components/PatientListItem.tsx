"use client";

import { Patient } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MessageSquarePlus } from "lucide-react";

interface PatientListItemProps {
  patient: Patient;
  hasExistingChat: boolean;
  onClick: () => void;
}

export function PatientListItem({ patient, hasExistingChat, onClick }: PatientListItemProps) {
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const lastSeenLabel = patient.isOnline
    ? "Online"
    : patient.lastSeen
    ? `Last seen ${new Date(patient.lastSeen).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : "Offline";

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl mx-1 transition-all duration-150",
        "hover:bg-slate-50 dark:hover:bg-slate-800/60 group"
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar className="h-11 w-11 ring-2 ring-white dark:ring-slate-900">
          <AvatarImage src={patient.avatarUrl} alt={patient.name} />
          <AvatarFallback className="bg-gradient-to-br from-violet-400 to-indigo-500 text-white text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {patient.isOnline ? (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
        ) : (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-2 ring-white dark:ring-slate-900" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
          {patient.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {patient.condition && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4 font-medium bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300 border-0"
            >
              {patient.condition}
            </Badge>
          )}
          <span
            className={cn(
              "text-xs",
              patient.isOnline ? "text-emerald-500 font-medium" : "text-slate-400"
            )}
          >
            {lastSeenLabel}
          </span>
        </div>
      </div>

      {/* Action */}
      <Button
        size="sm"
        variant={hasExistingChat ? "ghost" : "default"}
        onClick={onClick}
        className={cn(
          "h-8 px-3 text-xs font-medium shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
          hasExistingChat
            ? "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        )}
      >
        <MessageSquarePlus className="h-3.5 w-3.5 mr-1" />
        {hasExistingChat ? "Open" : "Chat"}
      </Button>
    </div>
  );
}
