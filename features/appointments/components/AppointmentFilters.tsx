import { SearchInput } from "@/components/SearchInput";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterContainer, flexRow } from "@/lib/utils/layout";
import { statusConfig } from "../config/appointment-status.config";
import DateInput from "@/components/ui/dateInput";

export const AppointmentFilters = () => {
  return (
    <div className={filterContainer("md:grid-cols-[3fr_1fr_1fr]")}>
      <SearchInput
        label="Search patients and appointments"
        placeholder="Search patients and appointments"
        id="header-search-1"
      />
      <DateInput showLabel={false} isAppointment />
      <Select>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent position="popper" className="w-full">
          <SelectGroup>
            <SelectLabel>Types</SelectLabel>
            {Object.entries(statusConfig).map(([key, value]) => (
              <SelectItem key={key} value={key} className="flex-1">
                <div className={flexRow("justify-between")}>
                  <p>{value.label}</p>
                  {value.icon && <value.icon className="w-4 h-4 opacity-70" />}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
