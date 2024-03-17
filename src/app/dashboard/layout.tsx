import type { Metadata } from "next";
import "../globals.css";
import { roboto, inter } from "@/utils/font";
import { Header, LeftNav } from "@/components";
import Providers from "@/app/providers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Routes } from "@/constants";

export const metadata: Metadata = {
  title: "Dashboard - Expense Tracker",
  description: "Expense tracker dashboard.",
};

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session) {
    return redirect(Routes.signIn.fullPath);
  }

  return (
    <main className="">
      <div className="grid grid-cols-12">
        <aside className="col-span-3">
          <LeftNav />
        </aside>
        <section className="col-span-9">
          <Header session={session} />
          <div className="bg-primary-50 p-4 h-[90vh]">
            <div className="rounded-xl p-4 shadow-lg bg-white h-full overflow-y-auto custom-scroll">
              <Providers>{children}</Providers>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
