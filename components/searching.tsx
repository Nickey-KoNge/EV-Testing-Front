// src/app/components/searching.tsx
"use client";

import { useState, useEffect, useRef } from "react";

interface SearchingProps {
  onSearch: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

export default function Searching({
  onSearch,
  defaultValue = "",
  placeholder,
}: SearchingProps) {
  const [value, setValue] = useState(defaultValue);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 700);

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full max-w-sm px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
