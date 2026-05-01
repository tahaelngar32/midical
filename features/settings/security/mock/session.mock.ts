import { Session } from "../types/session-type";

export const sessions: Session[] = [
  {
    id: "1",
    device: "Chrome on macOS",
    location: "Boston, MA",
    type: "desktop",
    status: "active",
    isCurrent: true,
    lastActive: "Now",
  },
  {
    id: "2",
    device: "Chrome on Windows",
    location: "New York, NY",
    type: "desktop",
    status: "inactive",
    isCurrent: false,
    lastActive: "2 days ago",
  },
  {
    id: "3",
    device: "Safari on iPhone",
    location: "Boston, MA",
    type: "mobile",
    status: "inactive",
    isCurrent: false,
    lastActive: "4 days ago",
  },
];
