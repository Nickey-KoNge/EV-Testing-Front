//src/entities/staff/types/index.ts
export interface Staff {
  id: string;
  staff_name: string;
  email: string;
  address: string;
  role: {
    id: string;
    role_name: string;
  }
 branch: {
    id:string;
    branch_name: string;
 }
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
