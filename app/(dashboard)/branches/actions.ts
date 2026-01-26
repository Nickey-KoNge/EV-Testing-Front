// src/app/(dashboard)/branches/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createBranchAction(formData: FormData) {
  const rawData = {
    branch_name: formData.get('branch_name'),
    address: formData.get('address'),
    status: 'Active',
  };

  const res = await fetch(`${process.env.INTERNAL_API_URL}/master-company/branches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rawData),
  });

  if (res.ok) {
    revalidatePath('/branches'); // Data အသစ်ကို ချက်ချင်းပြဖို့ cache ရှင်းတာပါ
    return { success: true };
  }
  
  return { success: false };
}