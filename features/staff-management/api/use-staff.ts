//src/features/staff-management/api/use-staff.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios";
import { StaffResponse } from "@/entities/staff/types";

export const useStaffs = (params: { page?: number; search?: string }) => {
  return useQuery({
    queryKey: ["staffs", params],
    queryFn: async () => {
      const response = await api.get<never, StaffResponse>(
        "/master-company/staffs",
        {
          params,
        },
      );
      return response.data;
    },
  });
};
