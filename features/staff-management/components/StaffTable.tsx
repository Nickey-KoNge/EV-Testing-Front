"use client";

import { useStaffs } from "../api/use-staff";
import { Staff } from "@/entities/staff/types";
import { getStaffImageUrl } from "@/shared/lib/image-utils";
import Image from "next/image";
import Searching from "@/components/searching";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function StaffTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { data, isLoading, error } = useStaffs({ page, search });

  const handleUpdateParams = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (name === "search") {
        const currentSearch = searchParams.get("search") || "";
        if (value === currentSearch) return;

        params.set("page", "1");
        if (value) {
          params.set("search", String(value));
        } else {
          params.delete("search");
        }
      } else {
        if (value) {
          params.set(name, String(value));
        } else {
          params.delete(name);
        }
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace],
  );

  if (isLoading)
    return <div className="p-8 text-center">Loading staffs...</div>;
  if (error)
    return (
      <div className="p-8 text-red-500 text-center">Error fetching data</div>
    );

  return (
    <div className="space-y-4 searchbox">
      <div className="search-item">
        <h2 className="text-xl font-semibold">Staff Searching</h2>
        <Searching
          onSearch={(val) => handleUpdateParams("search", val)}
          defaultValue={search}
          placeholder="Search name, role or branch..."
        />
      </div>

      <div className="rounded-md border overflow-hidden">
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
              <tr
                key={staff.id}
                className="border-b hover:bg-zinc-50 transition-colors"
              >
                <td className="p-3 font-medium">{staff.staff_name}</td>
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
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      staff.status?.toLowerCase() === "active"
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

        <div className="p-4 flex items-center justify-between border-t bg-white">
          <div className="text-sm text-zinc-500">
            <span className="hidden sm:inline">Showing </span>
            <span className="font-semibold text-zinc-900">
              {(data?.data?.length ?? 0) > 0 ? (page - 1) * 10 + 1 : 0}
            </span>
            <span> to </span>
            <span className="font-semibold text-zinc-900">
              {(page - 1) * 10 + (data?.data.length || 0)}
            </span>
            <span> of </span>
            <span className="font-semibold text-zinc-900">
              {data?.total || 0}
            </span>
            <span> total records</span>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium text-zinc-600">
              Page {page} of {data?.totalPages || 1}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdateParams("page", page - 1)}
                disabled={page === 1}
                className="h-8 w-8 flex items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-600 transition-all hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <span className="sr-only">Previous Page</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={() => handleUpdateParams("page", page + 1)}
                disabled={page >= (data?.totalPages || 1)}
                className="h-8 w-8 flex items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-600 transition-all hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <span className="sr-only">Next Page</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
