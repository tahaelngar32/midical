import SettingsLayout from "@/features/settings/components/settingsLayout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <SettingsLayout >{children}</SettingsLayout>;
};

export default Layout;
