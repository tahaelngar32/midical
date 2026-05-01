import React from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      aria-label={label}
      className={cn(
        "flex items-center gap-2 bg-[#4988C4] text-white",
        "px-3 md:px-4 py-1.5 md:py-2",
        "text-sm md:text-md font-medium",
        "rounded-md transition-all duration-300",
        "hover:bg-[#3f78ad] hover:shadow-md hover:scale-[1.03]",
        "active:scale-95",
        className,
      )}
      {...props}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
