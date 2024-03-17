import { CategoryCard } from "@/components";
import { Routes } from "@/constants";
import { db } from "@/db";
import Link from "next/link";

export default async function CategoriesPage() {
  const allCategories = await db.expenseCategory.findMany();
  console.log(allCategories);
  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">All Categories</h2>
      <Link href={Routes.newCategories.fullPath} className="btn btn-primary">
        New Category
      </Link>
      <div className="grid">
        {allCategories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            allocatedAmount={`${category.allocatedAmount}`}
          />
        ))}
      </div>
    </div>
  );
}
