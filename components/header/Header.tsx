import React from "react";
import { HeaderMainSection } from "./HeaderMainSection";
import { HeaderActions } from "./HeaderActions";
import { cn } from "@/lib/utils";

export const Header: React.FC<{}> = () => {
  return (
    <header className={cn("my-2")}>
      <div className=" flex flex-col sm:flex-row items-start sm:items-center justify-between px-2   py-2 rounded-lg bg-white border border-[#E5E7EB]">
        <HeaderMainSection />
        <HeaderActions />
      </div>
    </header>
  );
};
