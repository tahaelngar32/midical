//combist pattern

//combist pattern
import React from "react";
import { cn } from "@/lib/utils";

interface RowProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

type RowComponent = React.FC<RowProps> & {
  Left: React.FC<{
    children: React.ReactNode;
    as?: React.ElementType;
    className?: string;
    props?: any;
  }>;
  Right: React.FC<{
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    props?: any;
  }>;
};
export const Row: RowComponent = ({
  as: Component = "div",
  className = "",
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-[#eef2f7] px-4 py-2",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Row.Left = ({ className = "", children, as: Component = "div", ...props }) => (
  <Component className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </Component>
);

Row.Right = ({ children, className, as: Component = "div", ...props }) => (
  <Component
    className={cn("flex items-center gap-2 flex-wrap", className)}
    {...props}
  >
    {children}
  </Component>
);
