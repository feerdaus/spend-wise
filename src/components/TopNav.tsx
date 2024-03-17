import { auth } from "@/auth";
import { Routes } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const TopNav = async () => {
  const session = await auth();
  return (
    <nav className="px-6 py-4 left-0 top-0 absolute z-50 w-full">
      <div className="custom-container mx-auto">
        <div className="flex justify-between items-center">
          <Image
            src="/logo.png"
            alt="Spend wise logo"
            width={100}
            height={100}
          />

          <div className="">
            {session ? (
              <Link
                href={Routes.dashboard.fullPath}
                className="text-lg font-medium"
              >
                <button className="btn btn-primary-outlined">
                  Go to dashboard
                </button>
              </Link>
            ) : (
              <Link href={Routes.signIn.fullPath}>
                <button className="btn btn-primary">Sign in</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
