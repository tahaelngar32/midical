import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/SearchInput";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterContainer } from "@/lib/utils/layout";
import React from "react";

export const PatientSearch: React.FC<{}> = () => {
  return (
    <div className={filterContainer("md:grid-cols-[4fr_1fr]")}>
      <SearchInput
        label="Search patients"
        placeholder="Search patients"
        id="header-search-1"
      />
    </div>
  );
};
