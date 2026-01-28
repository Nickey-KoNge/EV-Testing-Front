//src/entities/staff/types/index.ts
export interface Role {
  id: string;
  role_name: string;
}

export interface Branch {
  id: string;
  branch_name: string;
}
export interface Staff {
  id: string;
  staff_name: string;
  email: string;
  address: string;
  role: Role; // Use the exported interface
  branch: Branch;
  phone: string;
  position: string;
  image: string;
  status: string;
}

export interface StaffResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Staff[];
    total: number;
    totalPages: number;
  };
}
