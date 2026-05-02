import { ActiveSessionsSection } from "@/features/security/components/ActiveSessionsSection";
import { LoginHistorySection } from "@/features/security/components/LoginHistorySection";
import { PasswordSection } from "@/features/security/components/PasswordSection";
import { TwoFactorSection } from "@/features/security/components/TwoFactorSection";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-6">
      <PasswordSection />
      <TwoFactorSection />
      <ActiveSessionsSection />
      <LoginHistorySection />
    </div>
  );
};

export default Page;
