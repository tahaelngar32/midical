import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/features/notfication/mock/notifications.mock";
import { NotificationRow } from "./NotificationRow";
import Link from "next/link";
import { NotificationButton } from "@/components/header/NotificationButton";
import { no } from "zod/locales";

export function DropdownMenuNotfication() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-lg" variant="ghost">
          <NotificationButton notificationCount={notifications.length || 0} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="center">
        <DropdownMenuGroup asChild>
          <ul className="space-y-2">
            {notifications.slice(0, 3).map((notification) => (
              <DropdownMenuItem key={notification.id} asChild>
                <NotificationRow
                  notification={notification}
                  notificationMini={true}
                />
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-md bg-[#e5e7eb] rounded-0"
              asChild
            >
              <Link rel="stylesheet" href="/notifications">
                view all notifications
              </Link>
            </DropdownMenuItem>
          </ul>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
