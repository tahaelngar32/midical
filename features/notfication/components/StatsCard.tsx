import Image from "next/image";
import { cn } from "@/lib/utils";
import { flexRow } from "@/lib/utils/layout";

interface StatsCardProps {
  label: string;
  value: number;
  className: string;
  src: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  className,
  src,
}) => {
  return (
    <div
      className={flexRow(
        "px-3 py-4 rounded-md border border-[#E5E7EB] justify-between bg-white",
      )}
    >
      <div className="space-y-1">
        <h3 className="text-sm font-semibold leading-5 text-[#6B7280]">
          {label}
        </h3>

        <p className={cn(className, "font-extrabold text-xl leading-[2]")}>
          {value}
        </p>
      </div>

      <Image width={50} height={50} priority src={src} alt={label} />
    </div>
  );
};
