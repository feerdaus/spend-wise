import type { Metadata } from "next";
import "../../globals.css";
import { roboto, inter } from "@/utils/font";
import { LeftNav } from "@/components";

export const metadata: Metadata = {
  title: "Dashboard - Expense Tracker",
  description: "Expense tracker dashboard.",
};

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${inter.variable} font-inter`}>
        <main className="">
          <div className="grid grid-cols-12">
            <aside className="col-span-3">
              <LeftNav />
            </aside>
            <section className="col-span-9">
              <header className="py-8 border-b-2 h-[10vh] border-primary/10"></header>
              <div className="bg-primary-50 p-4 h-[90vh]">
                <div className="rounded-xl p-4 shadow-lg bg-white h-full overflow-y-auto custom-scroll">
                  {children}
                </div>
              </div>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
