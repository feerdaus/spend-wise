import { ProfileFormState, uploadToImageKit } from "@/actions";
import { auth } from "@/auth";
import { ProfileForm } from "@/components";
import { Routes } from "@/constants";
import { db } from "@/db";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  const updateProfile = async (
    formState: ProfileFormState,
    formData: FormData
  ) => {
    "use server";
    const name = formData.get("name");
    const avatar = formData.get("avatar");
    let imageUrl = "";

    if (!name) {
      return { ...formState, message: "Name is required" };
    }

    // @ts-ignore
    if (avatar?.name !== "undefined") {
      const file = avatar as File;
      if (file.size > 1048576) {
        return { ...formState, message: "Avatar size must be less than 1MB" };
      }
      // check if file is image
      if (!file.type.startsWith("image/")) {
        return { ...formState, message: "File must be an image" };
      }
      const imageKitResponse = await uploadToImageKit(file, name as string);

      if (!imageKitResponse.ok) {
        return { ...formState, message: "Failed to upload avatar" };
      } else {
        const { url } = await imageKitResponse.json();
        imageUrl = url;
      }
    }

    const update: { name: string; image?: string } = { name: name as string };

    if (imageUrl) {
      update.image = imageUrl;
    }

    // Update the user profile
    await db.user.update({
      data: update,
      where: {
        // @ts-ignore
        id: session?.user.id,
      },
    });

    redirect(Routes.dashboard.fullPath);
  };

  return (
    <div>
      <ProfileForm updateProfile={updateProfile} session={session} />
    </div>
  );
}
