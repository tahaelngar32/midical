import {
  TabsList,
  TabsTrigger,
  Tabs as TabsPrimitive,
} from "@/components/ui/tabs";
import { detailsTabConfig } from "../../config/details-tabs.config";
import Link from "next/link";
import { useActivePage } from "@/hooks/useActivePage";

export const Tabs = () => {
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
