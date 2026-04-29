"use client";

import { usePathname } from "next/navigation";

export const useActivePage = () => {
  const pathname = usePathname();

  const lastSegment = pathname.split("/").filter(Boolean).pop()?.split("?")[0];

  return lastSegment;
};
