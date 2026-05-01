"use client";

import { useEffect, useRef } from "react";
import { sidebarLinks } from "./sidebar.config";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useActivePage } from "@/hooks/useActivePage";
import gsap from "gsap";
import { useListAnimation } from "@/hooks/useListAnimation";
import SidebarItem from "./SidebarItem";

export const Navigation: React.FC = () => {
  const { listRef } = useListAnimation();
  return (
    <nav aria-label="Sidebar navigation">
      <ul ref={listRef} className="flex flex-col gap-1 px-3 py-3 list-none">
        {sidebarLinks.map((item) => {
          return <SidebarItem key={item.active} item={item} />;
        })}
      </ul>
    </nav>
  );
};
