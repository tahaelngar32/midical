import { Chat, Message } from "../types";
import { mockPatients } from "./mockPatients";

const DOCTOR_ID = "doctor-1";

// ─── Mock Messages ───────────────────────────────────────────────────────────

export const mockMessages: Record<string, Message[]> = {
  "chat-p1": [
    {
      id: "msg-1",
      chatId: "chat-p1",
      senderId: "p1",
      content: "Hello Dr. Wilson, I've been experiencing some dizziness lately.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "read",
      type: "text",
    },
    {
      id: "msg-2",
      chatId: "chat-p1",
      senderId: DOCTOR_ID,
      content: "Hi Sarah, I'm sorry to hear that. How long has this been going on?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9),
      status: "read",
      type: "text",
    },
    {
      id: "msg-3",
      chatId: "chat-p1",
      senderId: "p1",
      content: "About 3 days now. It happens mostly in the morning when I wake up.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8),
      status: "read",
      type: "text",
    },
    {
      id: "msg-4",
      chatId: "chat-p1",
      senderId: DOCTOR_ID,
      content: "That could be related to your blood pressure. Are you taking your medication regularly?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "read",
      type: "text",
    },
    {
      id: "msg-5",
      chatId: "chat-p1",
      senderId: "p1",
      content: "Yes, every morning. Should I come in for a check-up?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: "read",
      type: "text",
    },
  ],
  "chat-p2": [
    {
      id: "msg-6",
      chatId: "chat-p2",
      senderId: DOCTOR_ID,
      content: "James, your latest lab results are in. Your HbA1c is at 7.2% — good progress!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      status: "read",
      type: "text",
    },
    {
      id: "msg-7",
      chatId: "chat-p2",
      senderId: "p2",
      content: "That's great news! I've been sticking to the diet plan you recommended.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      status: "read",
      type: "text",
    },
    {
      id: "msg-8",
      chatId: "chat-p2",
      senderId: DOCTOR_ID,
      content: "Excellent work, James. Keep it up. I'll send you the updated prescription.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5),
      status: "delivered",
      type: "text",
    },
  ],
  "chat-p3": [
    {
      id: "msg-9",
      chatId: "chat-p3",
      senderId: "p3",
      content: "Dr. Wilson, my inhaler is running low. Can I get a refill?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      status: "delivered",
      type: "text",
    },
  ],
  "chat-p5": [
    {
      id: "msg-10",
      chatId: "chat-p5",
      senderId: "p5",
      content: "I have a really bad migraine today. Any advice?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: "delivered",
      type: "text",
    },
    {
      id: "msg-11",
      chatId: "chat-p5",
      senderId: DOCTOR_ID,
      content: "Take your sumatriptan as soon as possible. Rest in a dark room and stay hydrated.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      status: "sent",
      type: "text",
    },
  ],
};

// ─── Mock Chats ───────────────────────────────────────────────────────────────

export const mockChats: Chat[] = [
  {
    id: "chat-p1",
    participants: [DOCTOR_ID, "p1"],
    patient: mockPatients[0],
    lastMessage: mockMessages["chat-p1"][4],
    unreadCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    isArchived: false,
  },
  {
    id: "chat-p5",
    participants: [DOCTOR_ID, "p5"],
    patient: mockPatients[4],
    lastMessage: mockMessages["chat-p5"][1],
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
    isArchived: false,
  },
  {
    id: "chat-p3",
    participants: [DOCTOR_ID, "p3"],
    patient: mockPatients[2],
    lastMessage: mockMessages["chat-p3"][0],
    unreadCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
    isArchived: false,
  },
  {
    id: "chat-p2",
    participants: [DOCTOR_ID, "p2"],
    patient: mockPatients[1],
    lastMessage: mockMessages["chat-p2"][2],
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3.5),
    isArchived: false,
  },
];

export const CURRENT_DOCTOR_ID = DOCTOR_ID;
