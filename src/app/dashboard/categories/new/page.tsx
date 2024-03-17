import { ProfileFormState } from "@/actions";
import { auth } from "@/auth";
import { AddCategoryForm, BackArrowIcon } from "@/components";
import { Routes } from "@/constants";
import { db } from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewCategoryPage() {
  const session = await auth();

  const addCategory = async (
    formState: ProfileFormState,
    formData: FormData
  ) => {
    "use server";
    const name = formData.get("name");
    const allocated_amount = formData.get("allocated_amount");

    if (typeof name !== "string" || name.length < 1) {
      return { message: "Category name is required" };
    }

    if (typeof allocated_amount !== "string" || allocated_amount.length < 1) {
      return { message: "Allocated amount is required" };
    }

    await db.expenseCategory.create({
      data: {
        name,
        allocatedAmount: Number(allocated_amount),
        user: {
          connect: {
            // @ts-ignore
            id: session.user.id,
          },
        },
      },
    });

    redirect(Routes.categories.fullPath);
  };

  return (
    <div>
      <div className="flex gap-4 items-center mb-4">
        <Link href={Routes.categories.fullPath}>
          <div className="h-4 w-4">
            <BackArrowIcon />
          </div>
        </Link>
        <h2 className="font-semibold text-xl">New Expense Category</h2>
      </div>
      <AddCategoryForm addCategory={addCategory} />
    </div>
  );
}
