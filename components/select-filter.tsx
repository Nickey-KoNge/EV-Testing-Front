// src/app/components/select-filter.tsx
"use client";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFilterProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectFilter({
  label,
  value,
  options,
  onChange,
  placeholder = "All",
}: SelectFilterProps) {
  return (
    <div className="flex flex-col min-w-[150px]">
      {label && (
        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
