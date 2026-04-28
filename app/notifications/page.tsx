import { NotificationList } from "@/features/notfication/components/NotificationList";
import { NotificationsFilters } from "@/features/notfication/components/NotificationsFilters";
import Stats from "@/features/notfication/components/stats";
import { notifications } from "@/features/notfication/mock/notifications.mock";
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
