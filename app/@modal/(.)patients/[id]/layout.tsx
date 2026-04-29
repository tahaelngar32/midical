"use client";
import { Tabs } from "@/components/ui/tabs";
import { PatientHeader } from "@/features/patient/components/details/PatientHeader";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const handleClose = useCallback(() => {
    router.push("/patients");
  }, [router]);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);



  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-[1000] w-full h-screen transition-all duration-500"
      role="dialog"
      aria-modal="true"
      aria-labelledby="patient-modal-name"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl sm:px-7 px-4 py-2 transition-all duration-500 sm:w-auto sm:min-w-[800px] max-h-[90vh] overflow-auto"></div>

      <PatientHeader handleClose={handleClose} fullName="sara ali" id="123" />
      <Tabs />
      {children}
    </div>
  );
};

export default Layout;