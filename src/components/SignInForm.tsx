"use client";

import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { Input } from "./Input";
import { AlertDanger } from "./Alert";

export const SignInForm = () => {
  const [formState, action] = useFormState(actions.signIn, {
    message: "",
  });

  return (
    <section className="custom-container h-screen flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl text-primary font-bold mb-8">
          Sign In To Track Your Expenses
        </h1>
        <form className="mx-auto w-full" action={action}>
          <input name="provider" defaultValue="google" type="hidden" />
          <button
            type="submit"
            className="border border-primary flex justify-evenly text-primary font-semibold  w-full px-4 py-2 rounded"
          >
            <img
              loading="lazy"
              height="24"
              width="24"
              id="provider-logo"
              src="https://authjs.dev/img/providers/google.svg"
            />
            Continue With Google
          </button>
        </form>

        <p className="text-center  my-4">or</p>

        <form className="mx-auto w-full" action={action}>
          <input name="provider" defaultValue="email" type="hidden" />

          <Input
            name="email"
            label="Email"
            inputProps={{ type: "email" }}
            inputContainerProps={{ className: "mb-8" }}
          />
          {Boolean(formState.message) && (
            <div className="my-4">
              <AlertDanger message={formState.message} />
            </div>
          )}
          <button
            type="submit"
            className="bg-primary font-semibold text-white w-full px-4 py-2 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};
