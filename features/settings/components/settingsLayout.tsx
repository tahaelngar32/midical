"use client";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useActivePage } from "@/hooks/useActivePage";
import React from "react";
import { SETTINGS_PAGES } from "../config/settings.config";
import { Tabs } from "@/components/Tabs";
import { PageHeader } from "@/components/PageHeader";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const activePage = useActivePage("profile");
  const page = SETTINGS_PAGES[activePage];
  const taps = SETTINGS_PAGES;
  return (
    <>
      <PageHeader title={page?.label} description={page?.description} />

      <Tabs tabs={taps} />
      {children}
    </>
  );
};

export default SettingsLayout;
