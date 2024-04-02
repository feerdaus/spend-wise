"use client";
import * as actions from "@/actions";
import { Session } from "next-auth";
import { useFormState } from "react-dom";
import { AlertDanger } from "./Alert";
import { Button } from "./CustomButton";
import { Input } from "./Input";

interface ProfileFormProps {
  session: Session | null;
  updateProfile: (
    formState: actions.ProfileFormState,
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  session,
  updateProfile,
}) => {
  const [formState, action] = useFormState(updateProfile, {
    message: "",
  });

  return (
    <form className="max-w-sm" action={action}>
      <Input
        name="name"
        label="Name"
        inputProps={{ defaultValue: session?.user?.name || "" }}
        inputContainerProps={{ className: "mb-4" }}
      />
      <Input
        name="email"
        label="Email"
        inputProps={{
          type: "email",
          defaultValue: session?.user?.email || "",
          disabled: true,
        }}
        inputContainerProps={{ className: "mb-4" }}
      />

      <Input
        name="avatar"
        label="Avatar"
        inputProps={{
          type: "file",
        }}
        inputContainerProps={{ className: "mb-8" }}
      />

      {Boolean(formState?.message) && (
        <div className="my-4">
          <AlertDanger message={formState.message} />
        </div>
      )}

      <Button
        text="Update Profile"
        className="btn btn-primary"
        disabled={false}
      />
    </form>
  );
};
