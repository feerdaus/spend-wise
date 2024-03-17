"use client";

import { useFormState } from "react-dom";
import { AlertDanger } from "./Alert";
import { Input } from "./Input";
import Select from "./Select";
import { Category } from "./types";
import { ProfileFormState } from "@/actions";
import { useCallback, useState } from "react";
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { useRouter } from "next/navigation";

interface ManageExpenseFormProps {
  description: string;
  amount: number;
  date: string;
  category: string;
  categories: Category[];
  id: string;
  updateExpense: (
    formState: ProfileFormState,
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
}

export const ManageExpenseForm: React.FC<ManageExpenseFormProps> = ({
  updateExpense,
  categories,
  description,
  amount,
  date,
  category,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formState, action] = useFormState(updateExpense, {
    message: "",
  });

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        action(formData);
        setEditing(false);
      }}
      // action={(FormData) => {
      //   action(FormData);
      //   setEditing(false);
      // }}
    >
      <input name="id" type="hidden" defaultValue={id} />
      <div className="flex gap-4">
        <Input
          name="description"
          placeholder="Expense description"
          inputProps={{ defaultValue: description, disabled: !editing }}
          inputContainerProps={{ className: "md:w-1/3" }}
        />
        <Input
          name="amount"
          placeholder="Amount"
          inputProps={{
            type: "number",
            defaultValue: amount,
            disabled: !editing,
          }}
          inputContainerProps={{ className: "md:w-1/6" }}
        />
        <Input
          name="date"
          placeholder="Date"
          inputProps={{
            type: "date",
            defaultValue: date,
            disabled: !editing,
          }}
          inputContainerProps={{ className: "md:w-1/6" }}
        />
        <Select
          selectContainerProps={{ className: "md:w-1/6" }}
          name="category"
          selectProps={{ defaultValue: category, disabled: !editing }}
          placeholder="Category"
          options={[
            { label: "Category", value: "" },
            ...categories.map((category) => ({
              label: category.name,
              value: category.id,
            })),
          ]}
        />
        <div className="md:w-1/6">
          {editing ? (
            <button type="submit" className="btn btn-primary w-full">
              {loading ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />{" "}
                  Saving
                </div>
              ) : (
                "Save"
              )}
            </button>
          ) : (
            <div className="flex h-full gap-4 items-center">
              <button onClick={handleEdit}>
                <div className="h-6 w-6 text-primary">
                  <EditIcon />
                </div>
              </button>
              <button>
                <div className="h-6 w-6 text-red-500">
                  <DeleteIcon />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      {Boolean(formState?.message) && (
        <div className="mb-2 max-w-[500px]">
          <AlertDanger message={formState.message} />
        </div>
      )}
    </form>
  );
};