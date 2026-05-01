import { useEffect, useRef } from "react";
import { toast } from "sonner";

function useToast({
  state,
  successMessage,
  errorMessage,
}: {
  state: any;
  successMessage: string;
  errorMessage: string;
}) {
  const toasted = useRef<string | null>(null);
  const id = state?.status === "success" ? state.id : null;
  useEffect(() => {
    if (state?.status === "success" && toasted.current !== id) {
      toast.success(successMessage);
      toasted.current = id;
    }
  }, [state?.status, id]);

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(errorMessage);
    }
  }, [state?.status]);

  const errors = state?.status === "error" ? state.errors : undefined;

  return { errors };
}

export default useToast;
