import { auth } from "@/auth";
import { Routes } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const TopNav = async () => {
  const session = await auth();
  return (
    <nav className="sm:px-6 py-4 left-0 top-0 absolute z-50 w-full">
      <div className="custom-container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              alt="spend-wise logo"
              src="/logo.png"
              width={64}
              height={64}
              className="mr-1 md:mr-4 h-16 w-16"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">
                SpendWise
              </h1>
              <i className="hidden sm:block md:text-md">
                Your everyday expense tracker
              </i>
            </div>
          </div>

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
