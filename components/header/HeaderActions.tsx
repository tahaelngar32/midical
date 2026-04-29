"use client";

import React, { useState } from "react";
import { Avatar } from "../Avatar";
import { SearchInput } from "../SearchInput";
import useQueryParams from "@/hooks/useQueryParam";
import { DropdownMenuNotification } from "@/features/notification/components/DropdownMenuNotification";

export const HeaderActions: React.FC = () => {
  const { params, setQueryParams } = useQueryParams();
  const [value, setValue] = useState(params.name || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setQueryParams({
      name: value || null,
    });
  }

  return (
    <div className="flex items-center gap-4 flex-1 justify-end w-full mt-2 sm:mt-0">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex-1 flex justify-end"
      >
        <SearchInput
          label="Search patients and appointments"
          placeholder="Search patients and appointments"
          id="header-search"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          className="max-w-sm"
        />
      </form>
      
      <DropdownMenuNotification />
      <Avatar />
    </div>
  );
};
