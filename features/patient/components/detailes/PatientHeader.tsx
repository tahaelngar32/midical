import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { XIcon } from "lucide-react";
import React from "react";

export const PatientHeader: React.FC<{
  handleClose: () => void;
  fullName: string;
  avatar?: string;
  id: string;
}> = ({ handleClose, fullName, avatar, id }) => {
  return (
    <div className="flex items-start justify-between sm:py-4 py-3">
      <Item>
        <ItemMedia>
          <Avatar name="sara ali" src={avatar} />
        </ItemMedia>
        <ItemContent className="gap-1">
          <ItemTitle className="capitalize" asChild>
            <h3>{fullName}</h3>
          </ItemTitle>
          <ItemDescription>Patient id:#{id}</ItemDescription>
        </ItemContent>
      </Item>

      <Button
        onClick={handleClose}
        variant={"ghost"}
        size={"icon-lg"}
        aria-label="Close patient details dialog"
      >
        <XIcon />
      </Button>
    </div>
  );
};
