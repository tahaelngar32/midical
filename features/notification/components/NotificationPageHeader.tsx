import Page from "@/app/settings/page";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Check } from "lucide-react";
import React from "react";

const NotificationPageHeader = () => {
  return (
    <Item>
      <ItemContent>
        <PageHeader
          title="Notifications"
          description="Stay updated with your practice activities"
        />
      </ItemContent>
      <ItemActions>
        <Button variant="outline">
          <Check className="mr-1" />
          Mark all read
        </Button>
        <Badge variant="secondary">3 unread</Badge>
      </ItemActions>
    </Item>
  );
};

export default NotificationPageHeader;
