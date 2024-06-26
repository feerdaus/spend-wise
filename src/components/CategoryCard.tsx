import { categoryColors, classifyNumber } from "@/constants";
import React, { useMemo } from "react";

interface CategoryCardProps {
  category: string;
  expense: number;
  allocatedAmount: number;
  balance: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  allocatedAmount,
  balance,
  expense,
  category,
}) => {
  const color = useMemo(() => {
    return categoryColors[classifyNumber(balance, allocatedAmount)];
  }, [balance, allocatedAmount]);

  return (
    <div
      style={{ backgroundColor: color }}
      className="rounded-lg w-full md:w-1/5 md:min-w-80 md:max-w-96 bg-[color] bx-shadow px-4 py-5 max-w-md"
    >
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold ">{category}</h3>
        <div>
          <p className="font-medium">Balance left</p>
          <p className="font-medium text-3xl">
            $ {Number(balance).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-11">
        <div>
          <p className="text-lg">Allocated amount</p>
          <p className="font-medium text-2xl">
            {Number(allocatedAmount).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-lg">Expenses</p>
          <p className="font-semibold text-2xl">
            $ {Number(expense).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
