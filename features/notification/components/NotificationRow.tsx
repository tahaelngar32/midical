import { Row } from "@/components/Row";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationItem } from "../types/notifications.type";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { NotificationTypeConfig } from "../config/notification-type.config";
import { notificationVariantConfig } from "../config/notification-variant.config";
import { NotificationPriorityConfig } from "../config/notification-priority.config";
import { checkboxVariantStyles } from "../config/notification-checkbox.config";

export const NotificationRow: React.FC<{
  notification: NotificationItem;
  notificationMini?: boolean;
}> = ({ notification, notificationMini = false }) => {
  if (!notification) return null;

  const typeConfig = NotificationTypeConfig[notification.tag];
  const Icon = typeConfig?.icon;

  const isSelectEnabled =
    notification.variant === "info" || notification.variant === "danger";

  const isDanger = notification.variant === "danger";

  return (
    <li>
      <Row
        as="article"
        className={cn(
          notificationVariantConfig[notification.variant],
          "px-1 py-1",
        )}
      >
        <Row.Left>
          <Item className={cn("pb-0 items-start", notificationMini && "gap-1")}>
            <ItemMedia>
              {Icon && (
                <Icon className={cn(notificationMini ? "size-4" : "size-6")} />
              )}
            </ItemMedia>

            <ItemContent className={cn("gap-2", notificationMini && "gap-0.5 space-y-1" )}>
              <ItemTitle asChild>
                <h3
                  className={cn(
                    "font-semibold",
                    notificationMini ? "text-sm" : "text-lg",
                  )}
                >
                  {notification.title}
                </h3>
              </ItemTitle>

              {!notificationMini && (
                <ItemDescription>{notification.description}</ItemDescription>
              )}

              <ItemFooter className="justify-start gap-2">
                <time
                  dateTime={notification.datetime}
                  className={cn(notificationMini ? "text-[10px]" : "text-xs")}
                >
                  {notification.time}
                </time>

                <StatusBadge
                  status={notification.tag}
                  config={NotificationTypeConfig}
                  className={cn(notificationMini && "text-[10px] px-1 py-0")}
                />

                {!notificationMini && (
                  <StatusBadge
                    status={notification.priority}
                    config={NotificationPriorityConfig}
                  />
                )}
              </ItemFooter>
            </ItemContent>
          </Item>
        </Row.Left>

        {!notificationMini && (
          <Row.Right className="pl-10 gap-2">
            {isSelectEnabled && (
              <Checkbox
                className={cn(
                  checkboxVariantStyles.default,
                  isDanger && checkboxVariantStyles.danger,
                )}
              />
            )}

            <Button size="icon" variant="destructive">
              <Trash2 className="size-4" aria-hidden />
            </Button>
          </Row.Right>
        )}
      </Row>
    </li>
  );
};
