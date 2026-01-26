// src/features/branch-management/api/use-branches.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios";
import { BranchResponse } from "@/entities/branch/types";

export const useBranches = (params: { page?: number; search?: string }) => {
  return useQuery({
    queryKey: ["branches", params],
    queryFn: async () => {
      const response = await api.get<never, BranchResponse>(
        "/master-company/branches",
        {
          params,
        },
      );
      return response.data;
    },
  });
};
