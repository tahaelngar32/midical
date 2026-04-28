import React, { useState } from "react";
import { sidebarLinks } from "./ sidebar.config";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useLayout } from "@/context/layout-context";
import { useActivePage } from "@/hookes/useActivePage";

export const Navigation: React.FC<{}> = () => {
  const activePage = useActivePage();
  const [isActive, setIsActive] = useState(activePage || "dashboard");

  return (
    <nav aria-label="Sidebar navigation">
      <ul className="flex flex-col gap-1 px-3 py-3 list-none">
        {sidebarLinks.map((item) => {
          const { label, icon: Icon } = item;
          return (
            <li key={item.active}>
              <Link
                href={item.url || "#"}
                onClick={() => setIsActive(item.active)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
                  isActive === item.active
                    ? "text-[#4988C4] bg-blue-50 border-r-2 border-[#4988C4]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
