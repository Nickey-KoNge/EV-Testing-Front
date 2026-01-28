// src/app/components/formfileupload.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface FormFileUploadProps {
  label: string;
  name: string;
  error?: string;
  initialImage?: string;
  onChange: (file: File | null) => void;
}

export default function FormFileUpload({
  label,
  name,
  error,
  initialImage,
  onChange,
}: FormFileUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-zinc-700">{label}</label>
      <div className="flex items-center gap-4 p-4 border-2 border-dashed border-zinc-300 rounded-lg bg-zinc-50 hover:bg-zinc-100 transition-colors">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border bg-zinc-200">
          {preview ? (
            <Image src={preview} alt="Preview" fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400 text-xs">
              No img
            </div>
          )}
        </div>
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
