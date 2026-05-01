"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export const useActivePage = (defaultPage = "dashboard") => {
  const segment = useSelectedLayoutSegment();

  if (!segment) {
    return defaultPage;
  }
  return segment;
};
