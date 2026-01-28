// src/components/deletemodel.tsx
"use client";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  name:string;
  isLoading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  name,
  isLoading,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
     
      <div
        className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          {/* Warning Icon */}
          <div className="mx-auto w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 mb-2">
            Confirm Delete
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-900">
              {/* FIX: Escaped quotes with &quot; to satisfy ESLint */}
              &quot;{itemName}&quot;
            </span>
            ? {`This action will remove the ${name} record permanently from the
            database.`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 bg-zinc-50 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 border border-zinc-300 rounded-lg text-sm font-semibold text-zinc-700 bg-white hover:bg-zinc-100 transition-colors disabled:opacity-50"
          >
            No, Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-red-600 rounded-lg text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              `Yes, Delete ${name}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
