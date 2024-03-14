"use client";
import { useFormState } from "react-dom";
import { Input } from "./Input";
import * as actions from "@/actions";
import { Session } from "next-auth";
import { AlertDanger } from "./Alert";

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

      <button className="btn btn-primary" type="submit">
        Update Profile
      </button>
    </form>
  );
};
