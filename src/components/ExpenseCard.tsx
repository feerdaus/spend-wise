import Link from "next/link";
import { ShoppingIcon } from "./Icons";

interface ExpenseCardProps {
  title: string;
  description: string;
  amount: string;
  date: string;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  description,
  amount,
  date,
}) => {
  return (
    <Link
      href="/"
      className="flex items-center shadow-xl justify-between mx-auto p-3 mb-3"
    >
      <div className="flex">
        <span className="p-2 bg-stone-200 rounded-xl mr-3">
          <ShoppingIcon />
        </span>
        <div>
          <p className="font-medium mb-3">{title}</p>
          <p className="text-grey-50">{description}</p>
        </div>
      </div>
      <div>
        <p className="text-red-600 font-medium text-lg mb-2">-${amount}</p>
        <p className="text-grey-50">{date}</p>
      </div>
    </Link>
  );
};
