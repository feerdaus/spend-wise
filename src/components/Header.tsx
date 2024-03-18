"use client";

import { Routes } from "@/constants";
import { Session } from "next-auth";
import * as actions from "@/actions";
import Link from "next/link";
import { MenuIcon } from "./Icons";
import { useCallback, useState } from "react";
import { MobileLeftNav } from "./LeftNav";

interface HeaderProps {
  session?: Session;
}

export const Header: React.FC<HeaderProps> = ({ session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuState = useCallback(
    (state: boolean) => () => {
      setIsMenuOpen(state);
    },
    []
  );

  return (
    <header className="p-4 border-b-2 h-[10vh] flex justify-between items-center border-primary/10">
      {isMenuOpen && (
        <div
          onClick={handleMenuState(false)}
          className="md:hidden transition-transform duration-500 absolute translate-x-280px left-0 top-0 w-full bg-primary/50 h-full"
        />
      )}
      <aside
        className={`w-5/6 max-w-full md:hidden border-r overflow-y-auto font-inter h-screen top-0 fixed border-gray-200 bg-white transition-transform duration-500 ${
          !isMenuOpen
            ? "-translate-x-[400px] md:-translate-x-0"
            : "translate-x-0"
        }`}
      >
        <MobileLeftNav handleMenuState={handleMenuState} />
      </aside>
      <div className="hidden md:block">
        {" "}
        {session?.user?.name ? (
          <h2 className="font-semibold text-2xl">Hello, {session.user.name}</h2>
        ) : (
          <div className="my-4 p-2 bg-red-200 border rounded border-red-400">
            Your profile is incomplete. Fill in your details{" "}
            <Link
              className="text-primary underline"
              href={Routes.profile.fullPath}
            >
              here
            </Link>{" "}
            to complete your profile
          </div>
        )}
      </div>
      <div className="md:hidden">
        <button
          onClick={handleMenuState(true)}
          className="text-primary h-6 w-6"
        >
          <MenuIcon />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <img
          loading="lazy"
          alt="User avatar"
          height="48"
          width="48"
          className="rounded-full h-12 w-12"
          id="provider-logo"
          src={session?.user?.image || ""}
        />
        <form action={actions.signOut}>
          <button type="submit" className="btn btn-primary-outlined">
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
};
