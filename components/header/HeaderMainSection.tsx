"use client";
import { useLayout } from "@/context/layout-context";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export const HeaderMainSection: React.FC<{}> = () => {
  const { activePage, toggleSidebar, isMobile } = useLayout();
  const title = (activePage !== "_not-found"&& activePage)
    ? activePage
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "):"Dashboard";

  return (
    <div className="flex items-center">
      <Button
        className={cn(isMobile ? "block" : "hidden")}
        size={"icon-lg"}
        variant={"ghost"}
        aria-label="Toggle navigation menu"
        id="sidebar-toggle"
        onClick={toggleSidebar}
      >
        <Menu className="mx-auto" />
      </Button>

      <span className="font-bold text-xl align-center text-[#101828] mt-1.5">
        {title}
      </span>
    </div>
  );
};
