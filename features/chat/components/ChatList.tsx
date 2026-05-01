"use client";

import { Chat } from "../types";
import { ChatListItem } from "./ChatListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export function ChatList({ chats, activeChatId, onSelectChat }: ChatListProps) {
  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-400">
        <MessageSquare className="h-10 w-10 opacity-30" />
        <p className="text-sm">No conversations yet</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-2">
      <div className="flex flex-col gap-0.5 py-2">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
