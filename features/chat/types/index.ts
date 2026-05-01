
export type UserRole = "doctor" | "patient";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  specialty?: string; // for doctors
  isOnline: boolean;
  lastSeen?: Date;
}


export interface Patient extends User {
  role: "patient";
  age: number;
  condition?: string;
  phone?: string;
  email?: string;
}


export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed";

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  type: "text" | "image" | "file" | "prescription";
  metadata?: {
    fileName?: string;
    fileSize?: number;
    prescriptionId?: string;
  };
}


export interface Chat {
  id: string;
  participants: string[]; // user ids
  patient: Patient;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}


export type SidebarTab = "chats" | "patients";

export interface ChatUIState {
  activeChatId: string | null;
  sidebarTab: SidebarTab;
  searchQuery: string;
}
