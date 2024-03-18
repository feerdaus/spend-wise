"use client";

import { useFormState } from "react-dom";
import { AlertDanger } from "./Alert";
import { Input } from "./Input";
import Select from "./Select";
import { Category } from "./types";
import { ProfileFormState } from "@/actions";

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
  const [formState, action] = useFormState(addExpense, {
    message: "",
  });

  return (
    <form className="" action={action}>
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
        <button type="submit" className="btn btn-primary md:w-1/6">
          Add
        </button>
      </div>
      {Boolean(formState?.message) && (
        <div className="mt-4 max-w-[500px]">
          <AlertDanger message={formState.message} />
        </div>
      )}
    </form>
  );
};
