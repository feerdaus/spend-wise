import { auth } from "@/auth";
import { SignInForm } from "@/components";
import { Routes } from "@/constants";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect(Routes.dashboard.fullPath);
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
}
