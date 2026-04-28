import { cn } from "./cn";

export const flexRow = (className?: string) =>
  cn("flex items-center gap-2", className);
export const styledList = (className?: string) =>
  cn("flex flex-col gap-4 ", className);
export const filterContainer = (grid: string, className?: string) =>
  cn(
    "grid grid-cols-1 gap-4 p-6 bg-white rounded-md border border-[#E5E7EB]",
    grid,
    className,
  );
