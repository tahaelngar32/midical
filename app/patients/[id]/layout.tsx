"use client";

import { PatientHeader } from "@/features/patient/components/details/PatientHeader";
import { Tabs } from "@/features/patient/components/details/Tabs";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.push("/patients");
  }, [router]);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);
    


  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-[1000]"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        className="
    fixed
    top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2

    w-[95%] sm:w-[90%] md:w-[85%] lg:w-[800px]
    
    bg-white
    rounded-xl
    shadow-xl

    px-4 sm:px-6 lg:px-7
    py-4 sm:py-5

    max-h-[90vh]
    overflow-auto

    flex flex-col
    gap-4
  "
      >
        {" "}
        <PatientHeader handleClose={handleClose} fullName="sara ali" id="123" />
        <Tabs />
        {children}
      </div>
    </div>
  );
};

export default Layout;
