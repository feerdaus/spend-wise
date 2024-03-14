import { Routes } from "@/constants";
import { Session } from "next-auth";
import * as actions from "@/actions";
import Link from "next/link";

interface HeaderProps {
  session?: Session;
}

export const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <header className="p-4 border-b-2 h-[10vh] flex justify-between items-center border-primary/10">
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
