//src/app/(dashboard)/staff/page.tsx
import { Suspense } from "react";
import StaffTable from "@/features/staff-management/components/StaffTable";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function StaffsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      <Suspense fallback={<Skeleton className="w-full h-100" />}>
        <StaffTable />
      </Suspense>
    </div>
  );
}
