"use client";

import { Chat } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export function ChatListItem({ chat, isActive, onClick }: ChatListItemProps) {
  const { patient, lastMessage, unreadCount, updatedAt } = chat;

  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const timeLabel = formatDistanceToNow(new Date(updatedAt), { addSuffix: false });

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 rounded-xl mx-1",
        "hover:bg-slate-50 dark:hover:bg-slate-800/60",
        isActive && "bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900"
      )}
    >
      {/* Avatar with online indicator */}
      <div className="relative shrink-0">
        <Avatar className="h-11 w-11 ring-2 ring-white dark:ring-slate-900">
          <AvatarImage src={patient.avatarUrl} alt={patient.name} />
          <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-violet-500 text-white text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {patient.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span
            className={cn(
              "text-sm font-semibold truncate",
              isActive ? "text-indigo-700 dark:text-indigo-300" : "text-slate-800 dark:text-slate-100"
            )}
          >
            {patient.name}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0 ml-2">{timeLabel}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate leading-relaxed">
            {lastMessage?.content ?? (
              <span className="italic text-slate-400">Start a conversation</span>
            )}
          </p>
          {unreadCount > 0 && (
            <Badge className="shrink-0 h-5 min-w-5 px-1.5 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-600 text-white rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
