"use client";
import { useState, useCallback } from "react";
import { Chat, Patient, SidebarTab } from "../types";
import { mockChats, CURRENT_DOCTOR_ID } from "../data/mockChats";

interface UseChatReturn {
  chats: Chat[];
  activeChatId: string | null;
  activeChat: Chat | null;
  sidebarTab: SidebarTab;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setSidebarTab: (tab: SidebarTab) => void;
  selectChat: (chatId: string) => void;
  openChatWithPatient: (patient: Patient) => void;
  clearActiveChat: () => void;
  filteredChats: Chat[];
}

export function useChat(): UseChatReturn {
  // TODO: Replace with real API fetch
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(mockChats[0]?.id ?? null);
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("chats");
  const [searchQuery, setSearchQuery] = useState("");

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const filteredChats = chats.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.patient.name.toLowerCase().includes(q) ||
      c.lastMessage?.content.toLowerCase().includes(q)
    );
  });

  const selectChat = useCallback(
    (chatId: string) => {
      setActiveChatId(chatId);
      // Mark as read (optimistic)
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, unreadCount: 0 } : c))
      );
    },
    []
  );

  const openChatWithPatient = useCallback(
    (patient: Patient) => {
      // Check if a chat already exists for this patient
      const existingChat = chats.find((c) => c.patient.id === patient.id);

      if (existingChat) {
        setActiveChatId(existingChat.id);
        setSidebarTab("chats");
        return;
      }

      // Create a new chat (optimistic)
      // TODO: Replace with real API call: const newChat = await api.createChat({ patientId: patient.id })
      const newChat: Chat = {
        id: `chat-${patient.id}`,
        participants: [CURRENT_DOCTOR_ID, patient.id],
        patient,
        lastMessage: undefined,
        unreadCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isArchived: false,
      };

      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      setSidebarTab("chats");
    },
    [chats]
  );

  const clearActiveChat = useCallback(() => {
    setActiveChatId(null);
  }, []);

  return {
    chats,
    activeChatId,
    activeChat,
    sidebarTab,
    searchQuery,
    setSearchQuery,
    setSidebarTab,
    selectChat,
    openChatWithPatient,
    clearActiveChat,
    filteredChats,
  };
}
