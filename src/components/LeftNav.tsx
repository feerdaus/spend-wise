"use client";
import { Routes } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  path: string;
  selected?: boolean;
}

const navItems: NavItemProps[] = [
  { title: Routes.dashboard.name, path: Routes.dashboard.fullPath },
  { title: Routes.categories.name, path: Routes.categories.fullPath },
  { title: Routes.expenses.name, path: Routes.expenses.fullPath },
  { title: Routes.profile.name, path: Routes.profile.fullPath },
];

const NavItem: React.FC<NavItemProps> = ({ title, path, selected }) => {
  return (
    <Link href={path}>
      <li
        className={`text-xl font-semibold p-4 ${
          selected ? "bg-primary text-white" : "bg-slate-50"
        } hover:bg-primary hover:text-white rounded-md mb-4`}
      >
        {title}
      </li>
    </Link>
  );
};

export const LeftNav = () => {
  const pathname = usePathname();
  return (
    <div className="py-6 px-4 bg-primary/10 h-screen">
      <h1 className="text-3xl font-bold text-primary">Expense Tracker</h1>
      <ul className="mt-12">
        {navItems.map((item) => (
          <NavItem
            key={item.title}
            {...item}
            selected={
              item.path !== "/dashboard"
                ? pathname.startsWith(item.path)
                : pathname === item.path
            }
          />
        ))}
      </ul>
    </div>
  );
};
