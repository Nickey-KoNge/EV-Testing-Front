// src/app/components/formtextarea.tsx
"use client";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}
export default function FormTextarea({
  label,
  error,
  ...props
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-zinc-700"> {label}</label>
      <textarea
        {...props}
        className={`px-3 py-2 border rounded-md text-sm min-h-25 transition-all outline-none
          ${error ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : "border-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}
        `}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
