import { ProfileFormState } from "@/actions";
import { auth } from "@/auth";
import { AddExpenseForm, ManageExpenseForm } from "@/components";
import { Routes } from "@/constants";
import { db } from "@/db";
import { endOfMonth, startOfMonth } from "@/utils/date";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function ExpensePage(params: any) {
  const session = await auth();
  const allCategories = await db.expenseCategory.findMany({
    where: {
      // @ts-ignore
      userId: session?.user?.id,
    },
  });
  const startDate =
    params?.searchParams?.startDate || startOfMonth.toISOString();
  const endDate = params?.searchParams?.endDate || endOfMonth.toISOString();

  const allExpenses = await db.expense.findMany({
    where: {
      // @ts-ignore
      userId: session?.user?.id,
      AND: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
    orderBy: { date: "desc" },
  });

  const addExpense = async (
    formState: ProfileFormState,
    formData: FormData
  ) => {
    "use server";
    const description = formData.get("description");
    const amount = formData.get("amount");
    const category = formData.get("category");
    const date = formData.get("date");

    if (typeof description !== "string" || description.length < 3) {
      return { message: "Enter a valid description" };
    }

    if (typeof amount !== "string" || amount.length < 1) {
      return { message: "Amount is required" };
    }

    if (typeof category !== "string" || category.length < 1) {
      return { message: "Category is required" };
    }

    if (typeof date !== "string" || date.length < 1) {
      return { message: "Date is required" };
    }

    await db.expense.create({
      data: {
        description,
        amount: Number(amount),
        category: {
          connect: {
            id: category,
          },
        },
        date: new Date(date).toISOString(),
        user: {
          connect: {
            // @ts-ignore
            id: session.user.id,
          },
        },
      },
    });

    redirect(`${Routes.expenses.fullPath}?status=success`);
  };

  const updateExpense = async (
    formState: ProfileFormState,
    formData: FormData
  ) => {
    "use server";
    const description = formData.get("description");
    const amount = formData.get("amount");
    const category = formData.get("category");
    const date = formData.get("date");

    if (typeof description !== "string" || description.length < 3) {
      return { message: "Enter a valid description" };
    }

    if (typeof amount !== "string" || amount.length < 1) {
      return { message: "Amount is required" };
    }

    if (typeof category !== "string" || category.length < 1) {
      return { message: "Category is required" };
    }

    if (typeof date !== "string" || date.length < 1) {
      return { message: "Date is required" };
    }

    await db.expense.update({
      where: {
        id: formData.get("id") as string,
      },
      data: {
        description,
        amount: Number(amount),
        category: {
          connect: {
            id: category,
          },
        },
        date: new Date(date).toISOString(),
      },
    });

    revalidatePath(Routes.expenses.fullPath);
    revalidatePath(Routes.dashboard.fullPath);
    revalidatePath(Routes.categories.fullPath);
    redirect(Routes.expenses.fullPath);
  };

  return (
    <div>
      <div>
        <h2 className="font-medium text-xl">All Expenses</h2>
      </div>
      <hr className="my-6" />

      <AddExpenseForm addExpense={addExpense} categories={allCategories} />
      <div className="mt-8">
        {allExpenses.map((expense) => (
          <ManageExpenseForm
            key={expense.id}
            id={expense.id}
            amount={expense.amount}
            date={new Date(expense.date).toISOString()?.split("T")?.[0]}
            category={expense.categoryId}
            categories={allCategories}
            description={expense.description}
            updateExpense={updateExpense}
          />
        ))}
      </div>
    </div>
  );
}
