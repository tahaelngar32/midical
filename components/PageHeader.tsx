import React from "react";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;

  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mx-2 lg:mx-0 ">
      <div>
        <h1 className="leading-[2] font-bold xl:text-xl text-lg text-[#101828]">
          {title}
        </h1>
        {description && (
          <p className="text-[#4A5565] font-normal text-base">{description}</p>
        )}
      </div>

      {action}
    </div>
  );
};
