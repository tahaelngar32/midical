"use client";

import { Chat } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Video, MoreVertical, FileText, Calendar, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  chat: Chat;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function ChatHeader({ chat, showBackButton, onBack }: ChatHeaderProps) {
  const { patient } = chat;

  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const statusLabel = patient.isOnline
    ? "Online"
    : patient.lastSeen
    ? `Last seen at ${new Date(patient.lastSeen).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    : "Offline";

  return (
    <header className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
      {/* Patient info */}
      <div className="flex items-center gap-2">
        {/* Back button — mobile only */}
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-9 w-9 mr-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
            aria-label="Back to chat list"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="relative">
          <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-slate-900">
            <AvatarImage src={patient.avatarUrl} alt={patient.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-violet-500 text-white text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {patient.isOnline && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{patient.name}</h3>
            {patient.condition && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300 border-0"
              >
                {patient.condition}
              </Badge>
            )}
          </div>
          <p
            className={cn(
              "text-xs",
              patient.isOnline ? "text-emerald-500 font-medium" : "text-slate-400"
            )}
          >
            {statusLabel}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
          title="Schedule Appointment"
          asChild
        >
          <Link href="/schedule-appointments">
            <Calendar className="h-4.5 w-4.5" />
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
          title="Voice Call"
        >
          <Phone className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
          title="Video Call"
        >
          <Video className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm w-48">
            <DropdownMenuItem className="gap-2">
              <FileText className="h-3.5 w-3.5" />
              View Prescriptions
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Calendar className="h-3.5 w-3.5" />
              View Appointments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
