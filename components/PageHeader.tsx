import React from "react";

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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mx-2 lg:mx-0">
      <div className="animate-in fade-in slide-in-from-left-4 duration-1500 ">
        <h1 className="leading-[2] font-bold xl:text-xl text-lg text-[#101828]">
          {title}
        </h1>
        {description && (
          <p className="text-[#4A5565] font-normal text-base animate-in fade-in slide-in-from-left-4 duration-1500  delay-1000">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
          {action}
        </div>
      )}
    </div>
  );
};
