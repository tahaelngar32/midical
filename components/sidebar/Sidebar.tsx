"use client";
import { useLayout } from "@/context/layout-context";
import { cn } from "@/lib/utils/cn";
import React from "react";
import { sidebarLinks } from "./ sidebar.config";
import { Link } from "lucide-react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export const Sidebar: React.FC<{}> = () => {
  const { isSidebarOpen, isMobile } = useLayout();
  return (
    <aside
      className={cn(
        "overflow-hidden transition-all duration-300 flex-shrink-0 bg-white border border-[#e5e7eb] rounded-[14px] self-start h-[88vh] absolute z-10 md:relative   lg:ml-0 ",
        isSidebarOpen ? "w-56 opacity-100" : "w-0 opacity-0",
      )}
      aria-label="Main navigation"
    >
      <div className="max-w-56">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <Navigation />
      </div>
    </aside>
  );
};
