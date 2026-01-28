//src/app/components/formselect.tsx
"use client";

interface Option {
  label: string;
  value: string | number;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export default function FormSelect({
  label,
  options,
  error,
  ...props
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-zinc-700">{label}</label>
      <select
        {...props}
        className={`px-3 py-2 border rounded-md text-sm bg-white cursor-pointer outline-none
          ${error ? "border-red-500 focus:border-red-500" : "border-zinc-300 focus:border-blue-500"}
        `}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
