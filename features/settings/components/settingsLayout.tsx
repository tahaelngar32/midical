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
import { flexRow } from "@/lib/utils/layout";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const activePage = useActivePage("profile");
  const page = SETTINGS_PAGES[activePage];
  const taps = SETTINGS_PAGES;
  console.log(taps.notifications);
  return (
    <>
      <PageHeader
        title={"Settings"}
        description={"Manage your account settings and preferences"}
      />
      <Tabs tabs={taps} />
      <div className="bg-white rounded-md border border-[#e5e7eb] flex flex-col gap-4 py-2">
        <Item>
          <ItemContent>
            <ItemTitle
              className={flexRow(
                " gap-2 md:text-xl text-lg font-semibold items-end ",
              )}
            >
              <div className="relative ">
                <page.icon className="absolute bottom-1  text-md " />{" "}
                <h2 className="pl-7">{page?.label}</h2>
              </div>
            </ItemTitle>
            <ItemDescription className="text-md">
              {page?.description}
            </ItemDescription>
          </ItemContent>
        </Item>
        {children}
      </div>
    </>
  );
};

export default SettingsLayout;
