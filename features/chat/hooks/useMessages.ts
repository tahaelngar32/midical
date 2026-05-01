"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { Message } from "../types";
import { mockMessages, CURRENT_DOCTOR_ID } from "../data/mockChats";

interface UseMessagesReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function useMessages(chatId: string | null): UseMessagesReturn {
  // TODO: Replace with real API:
  // e.g. useQuery for fetching, useMutation for sending
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(mockMessages);
  const [isLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = chatId ? (messagesMap[chatId] ?? []) : [];

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, chatId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!chatId || !content.trim()) return;

      // Optimistic update
      const optimisticMsg: Message = {
        id: `msg-${Date.now()}`,
        chatId,
        senderId: CURRENT_DOCTOR_ID,
        content: content.trim(),
        timestamp: new Date(),
        status: "sending",
        type: "text",
      };

      setMessagesMap((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] ?? []), optimisticMsg],
      }));

      try {
      
        await new Promise((res) => setTimeout(res, 600));

        // Mark as sent after "success"
        setMessagesMap((prev) => ({
          ...prev,
          [chatId]: (prev[chatId] ?? []).map((m) =>
            m.id === optimisticMsg.id ? { ...m, status: "sent" as const } : m
          ),
        }));
      } catch {
        // Mark as failed on error
        setMessagesMap((prev) => ({
          ...prev,
          [chatId]: (prev[chatId] ?? []).map((m) =>
            m.id === optimisticMsg.id ? { ...m, status: "failed" as const } : m
          ),
        }));
      }
    },
    [chatId]
  );

  return { messages, isLoading, sendMessage, scrollRef };
}
