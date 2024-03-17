"use client";
import { Routes } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FilterForm } from "./FilterForm";

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
      <div className="flex items-center">
        <Image
          alt="spend-wise logo"
          src="/logo.png"
          width={64}
          height={64}
          className="mr-4 h-16 w-16"
        />
        <div>
          <h1 className="text-2xl font-bold text-primary">SpendWise</h1>
          <i className="text-md">Your everyday expense tracker</i>
        </div>
      </div>
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
      <hr className="my-6" />
      <FilterForm />
    </div>
  );
};
