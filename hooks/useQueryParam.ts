import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsObject = Object.fromEntries(searchParams.entries());

  const setQueryParams = useCallback(
    (params: Record<string, string | null>) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          currentParams.delete(key);
        } else {
          currentParams.set(key, value);
        }
      });

      router.replace(`${pathname}?${currentParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return {
    params: paramsObject,
    setQueryParams,
  };
}

export default useQueryParams;
