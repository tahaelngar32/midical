import React from "react";
import { NotificationItem } from "../types/notifications.type";
import { NotificationRow } from "./NotificationRow";
import { styledList } from "@/lib/utils/layout";

export const NotificationList: React.FC<{
  notifications: NotificationItem[];
}> = ({ notifications }) => {
  return (
    <ul className={styledList()}>
      {notifications.map((notification) => (
        <NotificationRow notification={notification} key={notification.id} />
      ))}
    </ul>
  );
};
