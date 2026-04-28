import React from "react";
import { Avatar as AvatarComp, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

export const Avatar: React.FC<{
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
}> = ({ src, alt, name, className, ...props }) => {
  return (
    <AvatarComp
      className={cn("w-10 h-10 ", className)}
      aria-label="Open user profile"
      {...props}
    >
      <AvatarImage src={src || "https://github.com/shadcn.png"} alt={alt} />
      <AvatarFallback>
        {name
          ? name.split(" ")[0].charAt(0).toUpperCase() +
            name.split(" ")[1].charAt(0).toUpperCase()
          : "CN"}
      </AvatarFallback>
    </AvatarComp>
  );
};
