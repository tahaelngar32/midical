import { NotificationList } from "@/features/notification/components/NotificationList";
import { NotificationsFilters } from "@/features/notification/components/NotificationsFilters";
import Stats from "@/features/notification/components/stats";
import { notifications } from "@/features/notification/mock/notifications.mock";
import React from "react";

const Page = () => {
  return (
    <>
      <Stats />
      <NotificationsFilters />
      <NotificationList notifications={notifications} />
    </>
  );
};

export default Page;
