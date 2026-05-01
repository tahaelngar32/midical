"use client";

import { Chat, Patient, SidebarTab } from "../types";
import { ChatTabs } from "./ChatTabs";
import { ChatList } from "./ChatList";
import { PatientList } from "./PatientList";
import { Input } from "@/components/ui/input";
import { Search, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  chats: Chat[];
  patients: Patient[];
  activeChatId: string | null;
  sidebarTab: SidebarTab;
  searchQuery: string;
  filteredChats: Chat[];
  filteredPatients: Patient[];
  onSelectChat: (chatId: string) => void;
  onOpenChatWithPatient: (patient: Patient) => void;
  onTabChange: (tab: SidebarTab) => void;
  onSearchChange: (q: string) => void;
  /** Extra classes — used by ChatLayout to control width (e.g. w-full on mobile) */
  className?: string;
}

export function ChatSidebar({
  chats,
  patients,
  activeChatId,
  sidebarTab,
  searchQuery,
  filteredChats,
  filteredPatients,
  onSelectChat,
  onOpenChatWithPatient,
  onTabChange,
  onSearchChange,
  className,
}: ChatSidebarProps) {
  const unreadTotal = chats.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <aside className={cn(
      "shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full",
      className ?? "w-80"
    )}>
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-none">MedChat</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">Dr. Wilson's Practice</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder={sidebarTab === "chats" ? "Search chats..." : "Search patients..."}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-8 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus-visible:ring-indigo-500"
          />
        </div>

        {/* Tabs */}
        <ChatTabs
          activeTab={sidebarTab}
          onChange={onTabChange}
          unreadTotal={unreadTotal}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {sidebarTab === "chats" ? (
          <ChatList
            chats={filteredChats}
            activeChatId={activeChatId}
            onSelectChat={onSelectChat}
          />
        ) : (
          <PatientList
            patients={filteredPatients}
            chats={chats}
            onOpenChat={onOpenChatWithPatient}
          />
        )}
      </div>
    </aside>
  );
}
