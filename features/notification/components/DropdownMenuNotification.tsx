import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/features/notification/mock/notifications.mock";
import { NotificationRow } from "./NotificationRow";
import Link from "next/link";
import { NotificationButton } from "@/components/header/NotificationButton";

export function DropdownMenuNotification() {
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
              <Link href="/notifications">view all notifications</Link>
            </DropdownMenuItem>
          </ul>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
