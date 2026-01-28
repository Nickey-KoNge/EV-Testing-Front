// src/app/(dashboard)/staff/page.tsx
import { Suspense } from "react";
import StaffTable from "@/features/staff-management/components/StaffTable";
import { Skeleton } from "@/shared/components/ui/skeleton";
import Link from "next/link";

export default function StaffsPage() {
  return (
    <div className="p-6">
      {/* Container for Title and Action Button */}
      <div className="staff-header">
        <h1 className="text-2xl font-bold">Staff Management</h1>

        <Link href="/staff/register" className="btn-register">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Register New Staff
        </Link>
      </div>

      <Suspense fallback={<Skeleton className="w-full h-100" />}>
        <StaffTable />
      </Suspense>
    </div>
  );
}
