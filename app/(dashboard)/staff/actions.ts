//src/app/(dashboard)/staff/actions.ts
"use server";
//Create
export async function createStaffAction(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!formData.has("status")) {
      formData.append("status", "Active");
    }
    const res = await fetch(
      `${process.env.INTERNAL_API_URL}/master-company/staffs`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (res.ok) return { success: true };

    const err = await res.json();
    return { success: false, error: err.message || "Failed to create staff" };
  } catch (e) {
    return { success: false, error: `${e}Network error occurred` };
  }
}
//Update
export async function updateStaffAction(
  id: string,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_URL}/master-company/staffs/${id}`,
      {
        method: "PATCH", // NestJS uses PATCH for updates
        body: formData,
      },
    );

    if (res.ok) return { success: true };

    const err = await res.json();
    return { success: false, error: err.message || "Failed to update staff" };
  } catch (e) {
    return { success: false, error: "Network error occurred" };
  }
}
//delete
export async function deleteStaffAction(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_URL}/master-company/staffs/${id}`,
      {
        method: "DELETE",
      },
    );

    if (res.ok) {
      return { success: true };
    }

    const err = await res.json();
    return { success: false, error: err.message || "Failed to delete staff" };
  } catch (e) {
    return { success: false, error: "Network error occurred" };
  }
}
