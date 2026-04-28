"use client";

import React, { useState } from "react";
import { Avatar } from "../Avatar";
import { NotificationButton } from "./NotificationButton";
import { SearchInput } from "../SearchInput";
import useQueryParams from "@/hookes/useQueryParam";
import { DropdownMenuNotfication } from "@/features/notfication/components/DropdownMenuNotfication";

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
          onChange={(e: any) => setValue(e.target.value)}
          className="max-w-sm"
        />
      </form>
      
      <DropdownMenuNotfication />
      <Avatar />
    </div>
  );
};
