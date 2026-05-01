import { type ReactNode } from "react";
import { Button } from "./button";
import Link from "next/link";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
  children: ReactNode;
}

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-[14px] border border-[#e5e7eb] bg-white">
      <div className="flex items-center justify-between gap-5 px-6 py-6 flex-wrap">
        <div>
          <h2 className="text-[20px] font-medium leading-7 text-[#111827]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm leading-5 text-[#6b7280]">{subtitle}</p>
          )}
        </div>
        {action && (
          <Button
            className="rounded-md border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb]"
            asChild
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        )}
      </div>
      <div className="px-6 pb-6">{children}</div>
    </section>
  );
}
