"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  className,
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tl = gsap.timeline();

    tl.to(labelRef.current, {
      opacity: 0,
      y: 6,
      duration: 0.15,
      ease: "power2.in",
    })
      .to(
        iconRef.current,
        {
          opacity: 0,
          y: 6,
          duration: 0.15,
          ease: "power2.in",
        },
        "<",
      )
      .to(btnRef.current, {
        scaleX: 0.05,
        scaleY: 0.05,
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
      })
      .then(() => {
        onClick?.(e);

        // reset
        gsap.set(btnRef.current, { scaleX: 1, scaleY: 1, opacity: 1 });
        gsap.set([iconRef.current, labelRef.current], { opacity: 1, y: 0 });
      });
  };

  return (
    <button
      ref={btnRef}
      aria-label={label}
      className={cn(
        "flex items-center gap-2 bg-[#4988C4] text-white",
        "px-3 md:px-4 py-1.5 md:py-2",
        "text-sm md:text-md font-medium",
        "rounded-md transition-colors duration-300",
        "hover:bg-[#3f78ad] hover:shadow-md",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <span ref={iconRef} className="inline-flex">
        {icon}
      </span>
      <span ref={labelRef}>{label}</span>
    </button>
  );
};
