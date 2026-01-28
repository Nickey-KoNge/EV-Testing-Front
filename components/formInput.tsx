// src/app/components/forminput.tsx
"use client";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export default function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-zinc-700">{label}</label>
      <input
        {...props}
        className={`px-3 py-2 border rounded-md text-sm transition-all outline-none
          ${error ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : "border-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}
        `}
      />
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
}
