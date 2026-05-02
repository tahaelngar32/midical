import { LoginEvent } from "../types/login-even.types";

export const loginHistory: LoginEvent[] = [
  {
    id: "1",
    device: "Chrome on macOS",
    location: "Boston, MA",
    time: "Today, 9:42 AM",
    status: "success",
  },
  {
    id: "2",
    device: "Chrome on Windows",
    location: "New York, NY",
    time: "2 days ago, 3:11 PM",
    status: "success",
  },
  {
    id: "3",
    device: "Unknown device",
    location: "London, UK",
    time: "5 days ago, 11:02 PM",
    status: "failed",
  },
];
