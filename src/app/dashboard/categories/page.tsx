import CategoryCard from "@/components/CategoryCard";
import { Routes } from "@/constants";
import { db } from "@/db";
import Link from "next/link";

// const  categories = {
//   allocatedamount:35346
// }

export default async function CategoriesPage() {
  const allCategories = await db.expenseCategory.findMany();
  console.log(allCategories);
  return (
    <div>
      <h2 className="font-medium text-xl">All Categories</h2>
      <hr className="my-8" />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <CategoryCard
            category="Shopping"
            allocatedAmount={5678}
            balance={34634}
            expense={4244}
          />
        </div>
        <div className="col-span-1">
          <CategoryCard
            category="Shopping"
            allocatedAmount={5678}
            balance={34634}
            expense={4244}
          />
        </div>
        <div className="col-span-1">
          <CategoryCard
            category="Shopping"
            allocatedAmount={5678}
            balance={34634}
            expense={4244}
          />
        </div>
      </section>
      <Link href={Routes.newCategories.fullPath} className="btn btn-primary">
        New Category
      </Link>
    </div>
  );
}
