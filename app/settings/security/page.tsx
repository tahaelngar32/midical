import { ActiveSessionsSection } from "@/features/settings/security/components/ActiveSessionsSection";
import { LoginHistorySection } from "@/features/settings/security/components/LoginHistorySection";
import { PasswordSection } from "@/features/settings/security/components/PasswordSection";
import { TwoFactorSection } from "@/features/settings/security/components/TwoFactorSection";
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
