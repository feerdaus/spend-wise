"use client";

import { useFormState } from "react-dom";
import { AlertDanger } from "./Alert";
import { Input } from "./Input";
import Select from "./Select";
import { Category } from "./types";
import { ProfileFormState } from "@/actions";
import { Button } from "./CustomButton";
import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AddExpenseFormProps {
  categories: Category[];
  addExpense: (
    formState: ProfileFormState,
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  addExpense,
  categories,
}) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const status = params.get("status");
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, action] = useFormState(addExpense, {
    message: "",
  });

  const resetParams = useCallback(() => {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("status");
    router.replace(`${pathname}?${newParams.toString()}`);
  }, []);

  useEffect(() => {
    if (status === "success") {
      formRef.current?.reset();
      resetParams();
    }
  }, [status]);

  return (
    <form ref={formRef} className="" action={action}>
      <div className="md:flex gap-4">
        <Input
          name="description"
          placeholder="Expense description"
          inputContainerProps={{ className: "md:w-1/3" }}
        />
        <Input
          name="amount"
          placeholder="Amount"
          inputProps={{ type: "number" }}
          inputContainerProps={{ className: "md:w-1/6" }}
        />
        <Input
          name="date"
          placeholder="Date"
          inputProps={{ type: "date" }}
          inputContainerProps={{ className: "md:w-1/6" }}
        />
        <Select
          selectContainerProps={{ className: "md:w-1/6" }}
          name="category"
          placeholder="Category"
          options={[
            { label: "Category", value: "" },
            ...categories.map((category) => ({
              label: category.name,
              value: category.id,
            })),
          ]}
        />
        <Button text="Add" className="btn btn-primary md:w-1/6" />
      </div>
      {Boolean(formState?.message) && (
        <div className="mt-4 max-w-[500px]">
          <AlertDanger message={formState.message} />
        </div>
      )}
    </form>
  );
};
