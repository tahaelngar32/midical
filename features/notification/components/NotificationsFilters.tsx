"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryParams from "@/hooks/useQueryParam";
import { filterContainer, flexRow } from "@/lib/utils/layout";
import React, { useEffect } from "react";
import {
  notificationFilterOptions,
  DEFAULT_FILTER,
} from "../config/notification-filter.config";

export const NotificationsFilters: React.FC = () => {
  const {
    params: { filterBy },
    setQueryParams,
  } = useQueryParams();

  useEffect(() => {
    if (!filterBy) {
      setQueryParams({ filterBy: DEFAULT_FILTER });
    }
  }, [filterBy, setQueryParams]);

  return (
    <div className={filterContainer("md:grid-cols-[3fr_1fr_1fr]")}>
      <div className={flexRow()}>
        <Label className="text-md font-semibold">Filter By :</Label>

        <Select
          value={filterBy || DEFAULT_FILTER}
          onValueChange={(value) => setQueryParams({ filterBy: value })}
        >
          <SelectTrigger className="bg-gray-50">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {notificationFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
