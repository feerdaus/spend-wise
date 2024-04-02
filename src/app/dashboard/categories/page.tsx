import { auth } from "@/auth";
import { Category, CategoryCard } from "@/components";
import { Routes, categoryColors } from "@/constants";
import { db } from "@/db";
import { endOfMonth, startOfMonth } from "@/utils/date";
import Link from "next/link";

// const  categories = {
//   allocatedamount:35346
// }

export default async function CategoriesPage(params: any) {
  const session = await auth();
  const userQuery = {
    // @ts-ignore
    userId: session?.user?.id,
  };
  const allCategories: Category[] = await db.expenseCategory.findMany({
    where: userQuery,
  });
  const startDate =
    params?.searchParams?.startDate || startOfMonth.toISOString();
  const endDate = params?.searchParams?.endDate || endOfMonth.toISOString();

  const allExpenses = await db.expense.findMany({
    where: {
      ...userQuery,
      AND: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
  });
  let categories: Record<string, number> = {};
  allExpenses.forEach((expense) => {
    categories[expense.categoryId] =
      (categories[expense.categoryId] || 0) + expense.amount;
  });
  allCategories.forEach((category) => {
    category.expenses = categories[category.id];
  });

  const legend = (
    <div className="flex justify-evenly gap-4 flex-wrap">
      {Object.entries(categoryColors).map(([name, col]) => (
        <div key={name + col} className="flex flex-col items-center">
          <div style={{ backgroundColor: col }} className="h-4 w-4" />
          <span className="capitalize">{name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-xl">All Categories</h2>
        <div className="hidden md:block">{legend}</div>
        <Link href={Routes.newCategories.fullPath} className="btn btn-primary">
          New Category
        </Link>
      </div>
      <hr className="my-6" />

      <div className="md:hidden mb-8">{legend}</div>

      <div className="flex gap-4 flex-wrap">
        {Boolean(allCategories.length) &&
          allCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category.name}
              allocatedAmount={category.allocatedAmount}
              balance={category.allocatedAmount - (category.expenses || 0)}
              expense={category.expenses || 0}
            />
          ))}
      </div>
    </div>
  );
}
