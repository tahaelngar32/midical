"use client";

import { useActivePage } from "@/hookes/useActivePage";
import { useIsMobile } from "@/hookes/useIsMobile";
import { createContext, useContext, useEffect, useState } from "react";

type LayoutContextType = {
  title: string;
  setTitle: (title: string) => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const activePage = useActivePage();
  const [title, setTitle] = useState(activePage||"Dashboard");
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
      value={{ title, setTitle, isSidebarOpen, toggleSidebar, isMobile }}
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
