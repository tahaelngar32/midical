import {
  TabsList,
  TabsTrigger,
  Tabs as TabsPrimitive,
} from "@/components/ui/tabs";
import Link from "next/link";
import { useActivePage } from "@/hooks/useActivePage";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: {
    [key: string]: {
      link: string;
      label: string;
      icon?: React.ElementType;
    };
  };
}

export const Tabs = ({ tabs }: TabsProps) => {
  const activePage = useActivePage();
  return (
    <TabsPrimitive defaultValue="overview" value={activePage}>
      <TabsList className="w-full">
        {Object.entries(tabs).map(([key, value]) => (
          <TabsTrigger key={key} value={key}>
            <Link
              href={value?.link}
              className="flex items-center gap-2 text-sm font-medium "
            >
              {value?.label}{" "}
              {value?.icon && <value.icon className={cn("w-4 h-4 opacity-70",key === activePage && "text-[#4988C4]")} />}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsPrimitive>
  );
};
