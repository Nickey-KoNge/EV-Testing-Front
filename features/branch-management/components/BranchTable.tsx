// src/features/branch-management/components/BranchTable.tsx
"use client";

import { useBranches } from "../api/use-branches";
import { useState } from "react";
import { Branch } from "@/entities/branch/types";

export default function BranchTable() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useBranches({ page });

  if (isLoading) return <div>Loading branches...</div>;
  if (error) return <div className="text-red-500">Error fetching data</div>;

  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 border-b">
          <tr>
            <th className="p-3 text-left">Branch Name</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((branch: Branch) => (
            <tr key={branch.id} className="border-b hover:bg-zinc-50">
              <td className="p-3">{branch.branch_name}</td>
              <td className="p-3">{branch.address}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    branch.status?.toLocaleLowerCase() === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {branch.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-3 flex items-center justify-between border-t">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {data?.totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= (data?.totalPages || 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
