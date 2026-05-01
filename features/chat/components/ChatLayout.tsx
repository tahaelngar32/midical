"use client";

import { useChat } from "../hooks/useChat";
import { useMessages } from "../hooks/useMessages";
import { usePatients } from "../hooks/usePatients";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { MessageSquare } from "lucide-react";

export function ChatLayout() {
  const isMobile = useIsMobile();

  const {
    chats,
    activeChatId,
    activeChat,
    sidebarTab,
    searchQuery,
    filteredChats,
    setSidebarTab,
    setSearchQuery,
    selectChat,
    openChatWithPatient,
    clearActiveChat,
  } = useChat();

  const { messages, sendMessage, scrollRef } = useMessages(activeChatId);

  const {
    filteredPatients,
    searchQuery: patientSearch,
    setSearchQuery: setPatientSearch,
  } = usePatients();

  const handleSearchChange = (q: string) => {
    if (sidebarTab === "chats") setSearchQuery(q);
    else setPatientSearch(q);
  };

  const currentSearch = sidebarTab === "chats" ? searchQuery : patientSearch;

  // Mobile: show sidebar OR chat (not both). Desktop: show both side-by-side.
  const showSidebar = isMobile ? !activeChatId : true;
  const showMain    = isMobile ? !!activeChatId : true;

  return (
    <div className="flex h-[90vh] bg-slate-100 dark:bg-slate-950 overflow-hidden rounded-md p-4 bg-white border border-slate-200 dark:border-slate-800">

      {/* ── SIDEBAR ── */}
      {showSidebar && (
        <ChatSidebar
          // full width on mobile, fixed 320px on desktop
          className={isMobile ? "w-full" : "w-80"}
          chats={chats}
          patients={filteredPatients}
          activeChatId={activeChatId}
          sidebarTab={sidebarTab}
          searchQuery={currentSearch}
          filteredChats={filteredChats}
          filteredPatients={filteredPatients}
          onSelectChat={selectChat}
          onOpenChatWithPatient={openChatWithPatient}
          onTabChange={setSidebarTab}
          onSearchChange={handleSearchChange}
        />
      )}

      {/* ── MAIN CHAT AREA ── */}
      {showMain && (
        <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900">
          {activeChat ? (
            <>
              <ChatHeader
                chat={activeChat}
                showBackButton={!!isMobile}
                onBack={clearActiveChat}
              />
              <MessageList messages={messages} scrollRef={scrollRef} />
              <ChatInput onSend={sendMessage} />
            </>
          ) : (
            <EmptyState />
          )}
        </main>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-slate-400 bg-slate-50 dark:bg-slate-950/50">
      <div className="h-20 w-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center">
        <MessageSquare className="h-10 w-10 text-indigo-300 dark:text-indigo-700" />
      </div>
      <div className="text-center">
        <h3 className="text-base font-semibold text-slate-600 dark:text-slate-300 mb-1">
          No conversation selected
        </h3>
        <p className="text-sm text-slate-400">
          Choose a chat or pick a patient to get started
        </p>
      </div>
    </div>
  );
}
