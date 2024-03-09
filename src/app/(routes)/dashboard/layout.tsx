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
              <header className="py-8"></header>
              {children}
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
