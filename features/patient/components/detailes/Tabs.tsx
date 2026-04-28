import {
  TabsList,
  TabsTrigger,
  Tabs as TabsPrimitive,
} from "@/components/ui/tabs";
import { Details } from "@/features/appointments/components/Details";
import React, { useState } from "react";
import { detailsTabConfig } from "../../config/details-tabs.config";
import Link from "next/link";
import { useActivePage } from "@/hookes/useActivePage";

export const Tabs: React.FC<{}> = () => {
  const activePage = useActivePage();
  return (
    <TabsPrimitive defaultValue="overview" value={activePage}>
      <TabsList className="w-full">
        {Object.entries(detailsTabConfig).map(([key, value]) => (
          <TabsTrigger key={key} value={key}>
            <Link href={value.link}>{value.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsPrimitive>
  );
};
