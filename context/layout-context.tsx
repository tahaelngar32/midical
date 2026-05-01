"use client";

import { useActivePage } from "@/hooks/useActivePage";
import { useIsMobile } from "@/hooks/useIsMobile";
import { createContext, useContext, useEffect, useState } from "react";

type LayoutContextType = {
  activePage: string | undefined;
  isSidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const activePage = useActivePage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <LayoutContext.Provider
      value={{ activePage, isSidebarOpen, toggleSidebar, isMobile }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used inside LayoutProvider");
  return context;
};
