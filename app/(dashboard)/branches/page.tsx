// src/app/(dashboard)/branches/page.tsx

import { Suspense } from "react";
import BranchTable from "@/features/branch-management/components/BranchTable";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function BranchesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Branch Management</h1>

      <Suspense fallback={<Skeleton className="w-full h-100" />}>
        <BranchTable />
      </Suspense>
    </div>
  );
}
