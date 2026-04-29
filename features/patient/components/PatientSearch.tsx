import { SearchInput } from "@/components/SearchInput";
import { filterContainer } from "@/lib/utils/layout";

export const PatientSearch = () => {
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
