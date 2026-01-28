// src/app/components/searching.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import DateRangePicker from "@/components/date";
import SelectFilter from "@/components/select-filter";

interface SearchingProps {
  onSearch: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  onDateChange: (start: string, end: string) => void;
  defaultStart?: string;
  defaultEnd?: string;
  onReset: () => void;
  onFilterChange: (name: string, value: string) => void;
  defaultRole?: string;
  defaultBranch?: string;
  roleOptions: { label: string; value: string }[];
  branchOptions: { label: string; value: string }[];
}

export default function Searching({
  onSearch,
  defaultValue = "",
  placeholder,
  onDateChange,
  defaultStart = "",
  defaultEnd = "",
  onReset,
  onFilterChange,
  defaultRole = "",
  defaultBranch = "",
  roleOptions,
  branchOptions,
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

    if (value === defaultValue) return;

    const timeout = setTimeout(() => {
      onSearch(value);
    }, 700);

    return () => clearTimeout(timeout);
  }, [value, onSearch, defaultValue]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full max-w-sm px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <DateRangePicker
        onDateChange={onDateChange}
        defaultStart={defaultStart}
        defaultEnd={defaultEnd}
      />
      {/* Role Dropdown */}
      <SelectFilter
        label="Role"
        value={defaultRole}
        options={roleOptions}
        onChange={(val) => onFilterChange("roleId", val)}
        placeholder="All Roles"
      />

      {/* Branch Dropdown */}
      <SelectFilter
        label="Branch"
        value={defaultBranch}
        options={branchOptions}
        onChange={(val) => onFilterChange("branchId", val)}
        placeholder="All Branches"
      />

      {(defaultValue ||
        defaultStart ||
        defaultEnd ||
        defaultRole ||
        defaultBranch) && (
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors shadow-sm"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
