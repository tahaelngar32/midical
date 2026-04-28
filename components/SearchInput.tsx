import React from "react";
import { cn } from "@/lib/utils/cn";
import { Input } from "./ui/input";

import { SearchIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder: string;
  className?: string;
}

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
export const SearchInput = ({
  label,
  id,
  className,
  placeholder,
  ...props
}: SearchInputProps) => {
  return (
    <Field
      className={cn(
        "relative w-full bg-gray-50 focus-within:bg-white transition-colors  ",
        className,
      )}
    >
      <FieldLabel htmlFor={id} className="sr-only">
        {label}
      </FieldLabel>
      <InputGroup className="py-4">
        <InputGroupInput
          id={id}
          placeholder={placeholder}
          className="md:text-md"
          {...props}
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};
