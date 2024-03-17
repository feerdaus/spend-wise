import { CategoryCard } from "@/components";
import { Routes } from "@/constants";
import { db } from "@/db";
import Link from "next/link";

// const  categories = {
//   allocatedamount:35346
// }

export default async function CategoriesPage() {
  const allCategories = await db.expenseCategory.findMany();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-xl">All Categories</h2>
        <Link href={Routes.newCategories.fullPath} className="btn btn-primary">
          New Category
        </Link>
      </div>
      <hr className="my-6" />

      <div className="flex gap-4 flex-wrap">
        {allCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category.name}
            allocatedAmount={category.allocatedAmount}
            balance={category.allocatedAmount}
            expense={category.allocatedAmount}
          />
        ))}
      </div>
    </div>
  );
}
