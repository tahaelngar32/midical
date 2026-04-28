import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

function loading() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <Spinner />
    </div>
  );
}

export default loading;
