import React from "react";
import { Input } from "../ui/input";

export const SearchInput: React.FC<{}> = () => {
  return (
    <div className="relative w-full max-w-sm">
      <label htmlFor="header-search" className="sr-only">
        Search patients and appointments
      </label>

      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>

      <Input
        id="header-search"
        type="search"
        placeholder="Search patients, appointments..."
        className="pl-10 py-4"
      />
    </div>
  );
};



