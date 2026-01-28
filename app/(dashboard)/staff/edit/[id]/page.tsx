// src/app/(dashboard)/staff/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateStaffAction } from "../../actions";
import FormInput from "@/components/formInput";
import FormTextarea from "@/components/formtextarea";
import FormSelect from "@/components/formselect";
import FormFileUpload from "@/components/formfileupload";
import {
  useRoles,
  useBranches,
  RoleMetadata,
  BranchMetadata,
} from "@/features/staff-management/api/use-metadata";
import { Staff } from "@/entities/staff/types";

export default function EditStaffPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Staff | null>(null);

  const { data: roles, isLoading: rolesLoading } = useRoles();
  const { data: branches, isLoading: branchesLoading } = useBranches();

  // Map metadata for selects
  const roleOptions =
    roles?.map((r: RoleMetadata) => ({ label: r.role_name, value: r.id })) ||
    [];
  const branchOptions =
    branches?.map((b: BranchMetadata) => ({
      label: b.branch_name,
      value: b.id,
    })) || [];

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/master-company/staffs/${id}`,
        );
        const result = await res.json();
        // If your API wraps data in 'data', use result.data
        setInitialData(result.data || result);
      } catch (err) {
        console.error("Failed to fetch staff:", err);
      }
    };
    fetchStaff();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const result = await updateStaffAction(id as string, formData);

    if (result.success) {
      router.push("/staff");
    } else {
      alert(result.error);
      setLoading(false);
    }
  }

  if (!initialData)
    return (
      <div className="p-10 text-center animate-pulse">
        Loading Staff Data...
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Edit Staff Member</h1>
        <p className="text-zinc-500 text-sm">
          Update information for {initialData.staff_name}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-8 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            name="staff_name"
            label="Full Name"
            defaultValue={initialData.staff_name}
            required
          />
          <FormInput
            name="email"
            label="Email Address"
            type="email"
            defaultValue={initialData.email}
            required
          />
          <FormInput
            name="phone"
            label="Phone Number"
            type="tel"
            defaultValue={initialData.phone}
          />
          <FormInput
            name="position"
            label="Position"
            defaultValue={initialData.position}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            name="role_id"
            label={rolesLoading ? "Loading Roles..." : "Role"}
            options={roleOptions}
            defaultValue={initialData.role?.id}
            disabled={rolesLoading}
            required
          />
          <FormSelect
            name="branch_id"
            label={branchesLoading ? "Loading Branches..." : "Branch"}
            options={branchOptions}
            defaultValue={initialData.branch?.id}
            disabled={branchesLoading}
            required
          />
        </div>

        <FormTextarea
          name="address"
          label="Home Address"
          defaultValue={initialData.address}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormFileUpload
            label="Change Profile Image"
            name="file"
            onChange={() => {}}
            initialImage={initialData.image}
          />
          <FormInput
            name="password"
            label="New Password (Leave blank to keep current)"
            type="password"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.push("/staff")}
            className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-register">
            {loading ? "Saving Changes..." : "Update Staff Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
