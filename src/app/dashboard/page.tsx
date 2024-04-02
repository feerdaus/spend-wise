import { auth } from "@/auth";
import { Category, Dashboard, ExpenseCard } from "@/components";
import { db } from "@/db";
import { endOfMonth, startOfMonth } from "@/utils/date";

export default async function DashboardPage(params: any) {
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
    orderBy: { date: "desc" },
  });
  let categories: Record<string, number> = {};
  let categoryNames: Record<string, string> = {};
  let categoryColors: Record<string, string> = {};
  allExpenses.forEach((expense) => {
    categories[expense.categoryId] =
      (categories[expense.categoryId] || 0) + expense.amount;
  });
  allCategories.forEach((category) => {
    category.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    category.expenses = categories[category.id];
    categoryNames[category.id] = category.name;
    categoryColors[category.id] = category.color;
  });

  const chartData = allCategories.reduce(
    (acc: any, category) => {
      acc.labels.push(category.name);
      acc.datasets[0].data.push(category.expenses);
      acc.datasets[0].backgroundColor.push(category.color);
      return acc;
    },
    {
      labels: [],
      datasets: [
        {
          label: "Expenses",
          data: [],
          backgroundColor: [],
        },
      ],
    }
  );

  const allocatedAmountColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`;
  const expensesColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const barChartData = allCategories.reduce(
    (acc: any, category) => {
      acc.labels.push(category.name);
      acc.datasets[0].data.push(category.allocatedAmount);
      acc.datasets[0].backgroundColor.push(allocatedAmountColor);
      acc.datasets[1].data.push(category.expenses);
      acc.datasets[1].backgroundColor.push(expensesColor);
      return acc;
    },
    {
      labels: [],
      datasets: [
        { label: "Allocated Amount", data: [], backgroundColor: [] },
        { label: "Expenses", data: [], backgroundColor: [] },
      ],
    }
  );

  return (
    <div>
      <Dashboard data1={chartData} data2={barChartData} />
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Recent Expenses</h3>
        <div className="md:flex gap-4 flex-wrap">
          {allExpenses.slice(0, 10).map((expense) => (
            <div key={expense.id} className="w-full md:w-5/12">
              <ExpenseCard
                amount={expense.amount.toString()}
                title={expense.description}
                date={expense.date.toDateString()}
                category={categoryNames[expense.categoryId]}
                color={categoryColors[expense.categoryId]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
