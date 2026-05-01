type FormErrors = Record<string, string[]>;

export function FieldError({
  errors,
  name,
}: {
  errors?: FormErrors;
  name: string;
}) {
  const error = errors?.[name];
  return error ? <p className="text-red-500 text-sm">{error[0]}</p> : null;
}