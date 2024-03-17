import Link from "next/link";
import ShoppingIcon from "./Icons/ShoppingIcon";

interface CategoryCardProps {
  name: string;
  allocatedAmount: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  allocatedAmount,
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
          <p className="font-medium mb-3">{name}</p>
        </div>
      </div>
      <div>
        <p className="text-red-600 font-medium text-lg mb-2">
          -${allocatedAmount}
        </p>
      </div>
    </Link>
  );
};
