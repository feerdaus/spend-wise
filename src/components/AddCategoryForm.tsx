"use client";

import { ProfileFormState } from "@/actions";
import { Input } from "./Input";
import { useFormState } from "react-dom";
import { AlertDanger } from "./Alert";
import { Button } from "./CustomButton";

interface AddCategoryFormProps {
  addCategory: (
    formState: ProfileFormState,
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
}

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  addCategory,
}) => {
  const [formState, action] = useFormState(addCategory, {
    message: "",
  });

  return (
    <form className="max-w-sm" action={action}>
      <Input
        name="name"
        label="Category Name"
        placeholder="Enter category name"
        inputContainerProps={{ className: "mb-4" }}
      />
      <Input
        name="allocated_amount"
        label="Allocated Amount"
        placeholder="Enter allocated amount"
      />

      {Boolean(formState?.message) && (
        <div className="mt-4">
          <AlertDanger message={formState.message} />
        </div>
      )}

      {/* <button className="btn btn-primary mt-6">Add Category</button> */}
      <Button text="Add Category" className="btn btn-primary mt-6 w-40" />
    </form>
  );
};
