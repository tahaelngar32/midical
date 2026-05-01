import { useActivePage } from "@/hooks/useActivePage";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const SidebarItem = ({
  item,
}: {
  item: {
    active: string;
    label: string;
    url?: string;
    icon: React.ElementType;
  };
}) => {
  const isActive = useActivePage() === item.active;
  return (
    <li key={item.active}>
      <Link
        href={item.url || "#"}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          isActive
            ? "text-[#4988C4] bg-blue-50 border-r-2 border-[#4988C4]"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        )}
      >
        <item.icon
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            isActive ? "scale-110" : "group-hover:scale-105",
          )}
        />
        {item.label}
      </Link>
    </li>
  );
};

export default SidebarItem;
