//src/app/(dashboard)/staff/actions.ts
"use server";
import { revalidatePath } from "next/cache";

export async function createStaffAction(formData: FormData) {
  const rawData = {
    staff_name: formData.get("staff_name"),
    email: formData.get("email"),
    address: formData.get("address"),
    role_id: formData.get("role_id"),
    branch_id: formData.get("branch_id"),
    phone: formData.get("phone"),
    position: formData.get("position"),
    file: formData.get("image"),
    status: "Active",
  };
  const res = await fetch(`${process.env.INTERNAL_API_URL}/master-company/staffs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rawData),
  });

  if (res.ok){
    revalidatePath('/staffs');
    return {success: true};
  } 
  return { success: false};
}
