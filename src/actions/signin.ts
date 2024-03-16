"use server";

import * as auth from "@/auth";
import { Routes, validationSchema } from "@/constants";
import { redirect } from "next/navigation";

export type AllowedProviders = "email" | "google";

export interface FormState {
  message: string;
}

const handleEmailLogin = async (formData: FormData) => {
  const email = formData.get("email");
  try {
    await validationSchema.validate({ email });
    return auth.signIn("email", { email });
  } catch (error: any) {
    return { message: error.message };
  }
};

export const signIn = async (formState: FormState, formData: FormData) => {
  const provider = formData.get("provider");
  switch (provider) {
    case "email":
      handleEmailLogin(formData);
      redirect(Routes.checkEmail.fullPath);
    case "google":
      return auth.signIn("google");
    default:
      return { message: "Invalid provider" };
  }
};
