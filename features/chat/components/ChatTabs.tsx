"use client";

import { SidebarTab } from "../types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatTabsProps {
  activeTab: SidebarTab;
  onChange: (tab: SidebarTab) => void;
  unreadTotal: number;
}

export function ChatTabs({ activeTab, onChange, unreadTotal }: ChatTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(v) => onChange(v as SidebarTab)}>
      <TabsList className="w-full h-9 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
        <TabsTrigger
          value="chats"
          className={cn(
            "flex-1 text-xs font-semibold gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700",
            "data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400",
            "data-[state=active]:shadow-sm rounded-md transition-all"
          )}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Chats
          {unreadTotal > 0 && (
            <span className="ml-0.5 bg-indigo-600 text-white text-[9px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1">
              {unreadTotal}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="patients"
          className={cn(
            "flex-1 text-xs font-semibold gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700",
            "data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400",
            "data-[state=active]:shadow-sm rounded-md transition-all"
          )}
        >
          <Users className="h-3.5 w-3.5" />
          Patients
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
