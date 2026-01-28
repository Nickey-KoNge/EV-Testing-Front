// src/app/(dashboard)/staff/register/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { createStaffAction } from "../actions";
import { useState } from "react";
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

export default function RegisterStaffPage() {
  const { data: roles, isLoading: rolesLoading } = useRoles();
  const { data: branches, isLoading: branchesLoading } = useBranches();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleBack = () => router.push("/staff");
  const roleOptions =
    roles?.map((r: RoleMetadata) => ({
      label: r.role_name,
      value: r.id,
    })) || [];

  const branchOptions =
    branches?.map((b: BranchMetadata) => ({
      label: b.branch_name,
      value: b.id,
    })) || [];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const result = await createStaffAction(formData);

    if (result.success) {
      router.push("/staff");
    } else {
      alert(result.error || "An unknown error occurred");
      setLoading(false);
    }
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Register New Staff
          </h1>
          <p className="text-sm text-zinc-500">
            Add a new staff member to the company system.
          </p>
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl shadow-sm p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput name="staff_name" label="Full Name" required />
          <FormInput name="email" label="Email Address" type="email" required />
          <FormInput name="phone" label="Phone Number" type="tel" />
          <FormInput name="position" label="Position" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            name="role_id"
            label={rolesLoading ? "Loading Roles..." : "Role"}
            options={roleOptions}
            disabled={rolesLoading}
            required
          />
          <FormSelect
            name="branch_id"
            label={branchesLoading ? "Loading Branches..." : "Branch"}
            options={branchOptions}
            disabled={branchesLoading}
            required
          />
        </div>

        <FormTextarea name="address" label="Home Address" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Ensure the name here is "file" to match your NestJS @UploadedFile() */}
          <FormFileUpload
            label="Profile Image"
            name="file"
            onChange={() => {}}
          />
          <FormInput
            name="password"
            label="Account Password"
            type="password"
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/staff")}
            className="..."
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-register disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Staff Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
