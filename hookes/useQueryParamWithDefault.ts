"use client";

import { useEffect } from "react";
import useQueryParams from "@/hookes/useQueryParam";

export function useQueryParamWithDefault<T extends string>(
  key: string,
  defaultValue: T,
) {
  const { params, setQueryParams } = useQueryParams();

  const value = (params[key] as T) || defaultValue;

  useEffect(() => {
    if (!params[key]) {
      setQueryParams({ [key]: defaultValue });
    }
  }, [key, defaultValue, params, setQueryParams]);

  const setValue = (newValue: T) => {
    setQueryParams({ [key]: newValue });
  };

  return {
    value,
    setValue,
  };
}

