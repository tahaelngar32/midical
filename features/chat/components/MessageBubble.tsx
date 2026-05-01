"use client";

import { Message } from "../types";
import { CURRENT_DOCTOR_ID } from "../data/mockChats";
import { cn } from "@/lib/utils";
import { CheckCheck, Check, Clock, AlertCircle } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

const StatusIcon = ({ status }: { status: Message["status"] }) => {
  switch (status) {
    case "sending":
      return <Clock className="h-3 w-3 text-slate-300 animate-pulse" />;
    case "sent":
      return <Check className="h-3 w-3 text-slate-400" />;
    case "delivered":
      return <CheckCheck className="h-3 w-3 text-slate-400" />;
    case "read":
      return <CheckCheck className="h-3 w-3 text-indigo-400" />;
    case "failed":
      return <AlertCircle className="h-3 w-3 text-red-400" />;
    default:
      return null;
  }
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOwn = message.senderId === CURRENT_DOCTOR_ID;

  const timeLabel = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex mb-2", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] min-w-16 px-4 py-2.5 rounded-2xl shadow-sm",
          isOwn
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm border border-slate-100 dark:border-slate-700"
        )}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <div
          className={cn(
            "flex items-center gap-1 mt-1",
            isOwn ? "justify-end" : "justify-start"
          )}
        >
          <span
            className={cn(
              "text-[10px]",
              isOwn ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"
            )}
          >
            {timeLabel}
          </span>
          {isOwn && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  );
}
