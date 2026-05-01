type FormState =
  | {
      status: "success";
      id: string;
    }
  | {
      status: "error";
      errors: Record<string, string[]>;
    }
  | null;

export default FormState;
