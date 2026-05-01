"use client";

import { useEffect, useRef } from "react";
import useQueryParams from "@/hooks/useQueryParam";

export function useQueryParamWithDefault<T extends string>(
  key: string,
  defaultValue: T,
) {
  const { params, setQueryParams } = useQueryParams();
  const initialized = useRef(false);

  const value = (params[key] as T) || defaultValue;

  useEffect(() => {
    if (!initialized.current && !params[key]) {
      initialized.current = true;
      setQueryParams({ [key]: defaultValue });
    }
  }, []); 

  const setValue = (newValue: T) => {
    setQueryParams({ [key]: newValue });
  };

  return { value, setValue };
}
