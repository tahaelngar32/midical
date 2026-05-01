// Components
export { ChatLayout } from "./components/ChatLayout";
export { ChatSidebar } from "./components/ChatSidebar";
export { ChatTabs } from "./components/ChatTabs";
export { ChatList } from "./components/ChatList";
export { ChatListItem } from "./components/ChatListItem";
export { PatientList } from "./components/PatientList";
export { PatientListItem } from "./components/PatientListItem";
export { ChatHeader } from "./components/ChatHeader";
export { MessageList } from "./components/MessageList";
export { MessageBubble } from "./components/MessageBubble";
export { ChatInput } from "./components/ChatInput";

// Hooks
export { useChat } from "./hooks/useChat";
export { useMessages } from "./hooks/useMessages";
export { usePatients } from "./hooks/usePatients";

// Types
export type { User, Patient, Chat, Message, MessageStatus, SidebarTab, ChatUIState, UserRole } from "./types";
