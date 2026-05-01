"use client";

import { useChat } from "../hooks/useChat";
import { useMessages } from "../hooks/useMessages";
import { usePatients } from "../hooks/usePatients";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { MessageSquare } from "lucide-react";

export function ChatLayout() {
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
  } = useChat();

  const { messages, sendMessage, scrollRef } = useMessages(activeChatId);

  const {
    filteredPatients,
    searchQuery: patientSearch,
    setSearchQuery: setPatientSearch,
  } = usePatients();

  // Unified search handler per tab
  const handleSearchChange = (q: string) => {
    if (sidebarTab === "chats") {
      setSearchQuery(q);
    } else {
      setPatientSearch(q);
    }
  };

  const currentSearch = sidebarTab === "chats" ? searchQuery : patientSearch;

  return (
    <div className="flex h-[90vh] rounded-md bg-white dark:bg-slate-950 overflow-hidden border border-slate-200 p-4">
      {/* Sidebar */}
      <ChatSidebar
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

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900">
        {activeChat ? (
          <>
            <ChatHeader chat={activeChat} />
            <MessageList messages={messages} scrollRef={scrollRef} />
            <ChatInput onSend={sendMessage} />
          </>
        ) : (
          <EmptyState />
        )}
      </main>
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
