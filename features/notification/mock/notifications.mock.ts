import { NotificationItem } from "../types/notifications.type";

export const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Upcoming appointment with Sarah Johnson",
    description: "Video consultation scheduled for today at 2:00 PM",
    time: "5 minutes ago",
    datetime: "PT5M",
    tag: "appointment",
    priority: "high",
    unread: true,
    variant: "danger",
  },
  {
    id: "2",
    title: "Prescription ready for pickup",
    description:
      "Emma Davis - Amoxicillin prescription is ready at CVS Pharmacy",
    time: "5 minutes ago",
    datetime: "PT5M",
    tag: "prescription",
    priority: "low",
    unread: true,
    variant: "info",
  },
  {
    id: "3",
    title: "Security alert",
    description: "Video consultation scheduled for today at 2:00 PM",
    time: "5 minutes ago",
    datetime: "PT5M",
    tag: "security",
    priority: "high",
    unread: true,
    variant: "default",
  },
  {
    id: "4",
    title: "Appointment cancelled",
    description: "James Wilson cancelled his 3:30 PM appointment",
    time: "5 minutes ago",
    datetime: "PT5M",
    tag: "appointment",
    priority: "medium",
    unread: true,
    variant: "default",
  },
];



