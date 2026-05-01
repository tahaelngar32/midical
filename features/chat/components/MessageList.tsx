"use client";

import { Message } from "../types";
import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefObject } from "react";

interface MessageListProps {
  messages: Message[];
  scrollRef: RefObject<HTMLDivElement>;
}

function groupMessagesByDate(messages: Message[]) {
  const groups: { date: string; messages: Message[] }[] = [];

  messages.forEach((msg) => {
    const dateLabel = new Date(msg.timestamp).toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const last = groups[groups.length - 1];
    if (last && last.date === dateLabel) {
      last.messages.push(msg);
    } else {
      groups.push({ date: dateLabel, messages: [msg] });
    }
  });

  return groups;
}

export function MessageList({ messages, scrollRef }: MessageListProps) {
  const groups = groupMessagesByDate(messages);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-slate-50 dark:bg-slate-950/50"
    >
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-slate-400 italic">No messages yet. Say hello! 👋</p>
        </div>
      )}

      {groups.map((group) => (
        <div key={group.date}>
          {/* Date divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-950/50 px-2">
              {group.date}
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>

          {group.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      ))}
    </div>
  );
}
