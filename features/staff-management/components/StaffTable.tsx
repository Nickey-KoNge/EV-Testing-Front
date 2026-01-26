//src/features/staff-management/components/StaffTable.tsx
"use client";

import { useStaffs } from "../api/use-staff";
import { useState } from "react";
import { Staff } from "@/entities/staff/types";
import { getStaffImageUrl } from "@/shared/lib/image-utils";
import Image from "next/image";

export default function StaffTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useStaffs({ page });

  if (isLoading) return <div> Loading staffs...</div>;
  if (error) return <div className="text-red-500"> Error fetching data</div>;

  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 border-b">
          <tr>
            <th className="p-3 text-left">Staff Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Role Name</th>
            <th className="p-3 text-left">Branch Name</th>
            <th className="p-3 text-left">Phone Number</th>
            <th className="p-3 text-left">Position</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((staff: Staff) => (
            <tr key={staff.id} className="border-b hover:bg-zinc-50">
              <td className="p-3">{staff.staff_name}</td>
              <td className="p-3">{staff.email}</td>
              <td className="p-3">{staff.address}</td>
              <td className="p-3">{staff.role.role_name}</td>
              <td className="p-3">{staff.branch.branch_name}</td>
              <td className="p-3">{staff.phone}</td>
              <td className="p-3">{staff.position}</td>
              <td className="p-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border bg-gray-100">
                  <Image
                    src={getStaffImageUrl(staff.image)}
                    alt={staff.staff_name}
                    fill
                    sizes="40px"
                    unoptimized={true}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;

                      if (target.src.includes("/avatar-placeholder.png"))
                        return;

                      target.src = "/avatar-placeholder.png";
                    }}
                  />
                </div>
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    staff.status?.toLocaleLowerCase() === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {staff.status}
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
