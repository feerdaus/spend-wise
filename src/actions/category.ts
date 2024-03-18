"use server";

import { db } from "@/db";
import { FormState } from "./signin";
import { revalidatePath } from "next/cache";
import { Routes } from "@/constants";
import { redirect } from "next/navigation";

export async function deleteExpense(id: string) {
  await db.expense.delete({
    where: { id },
  });

  revalidatePath(Routes.expenses.fullPath);
  revalidatePath(Routes.dashboard.fullPath);
  revalidatePath(Routes.categories.fullPath);
  redirect(Routes.expenses.fullPath);
}
