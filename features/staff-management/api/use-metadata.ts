// src/features/staff-management/api/use-metadata.ts
import { useQuery } from "@tanstack/react-query";
export interface RoleMetadata {
  id: string;
  role_name: string;
}

export interface BranchMetadata {
  id: string;
  branch_name: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useRoles = () => {
  return useQuery<RoleMetadata[]>({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/master-service/roles`);
      if (!res.ok) throw new Error("Failed to fetch roles");
      const result = await res.json();

      const data = result?.data?.data;

      if (!Array.isArray(data)) {
        console.error("Roles API did not return an array:", result);
        return [];
      }
      return data;
    },
  });
};

export const useBranches = () => {
  return useQuery<BranchMetadata[]>({
    queryKey: ["branches"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/master-company/branches`);
      if (!res.ok) throw new Error("Failed to fetch branches");
      const result = await res.json();
      const data = result?.data?.data;

      if (!Array.isArray(data)) {
        console.error("Branches API did not return an array:", result);
        return [];
      }
      return data;
    },
  });
};
