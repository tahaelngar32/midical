import { BellRing } from "lucide-react";
import React from "react";

export const NotificationButton: React.FC<{ notificationCount: number }> = ({
  notificationCount,
}) => {
  return (
    <button className="relative" aria-label="View 5 notifications">
      <BellRing size={30} />
      <span
        className="text-xs absolute bg-[#FB2C36] px-[6px] py-[1px] bottom-[11px] left-[8px] rounded-full text-white"
        aria-hidden="true"
      >
        {notificationCount}
      </span>
    </button>
  );
};
