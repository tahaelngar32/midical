import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import React from "react";

export const Notes: React.FC<{ notes: string }> = ({
  notes,
}) => {
  return (
    <Item>
      <ItemContent>
        <ItemDescription>{notes}</ItemDescription>
      </ItemContent>
    </Item>
  );
};
