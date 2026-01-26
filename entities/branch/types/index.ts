// src/entities/branch/types/index.ts
export interface Branch {
  id: string;
  branch_name: string;
  address: string;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export interface BranchResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Branch[];
    total: number;
    totalPages: number;
  };
}