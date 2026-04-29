import React from "react";
import { getNotificationStats } from "../utils/getNotificationStats";
import { notifications } from "../mock/notifications.mock";
import { NotificationStats } from "../types/notifications.type";
import NotificationStatsConfig from "../config/notification-stats.config";
import { StatsCard } from "./StatsCard";
import { cn } from "@/lib/utils";

const Stats = ({ className = "" }: { className?: string }) => {
  const stats = getNotificationStats(notifications);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {(Object.entries(stats) as [keyof NotificationStats, number][]).map(
        ([key, value]) => {
          const config = NotificationStatsConfig[key];

          return (
            <StatsCard
              key={key}
              label={config.label}
              value={value}
              className={config.className}
              src={config.src}
            />
          );
        },
      )}
    </div>
  );
};

export default Stats;
