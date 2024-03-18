import { Routes } from "@/constants";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export { signIn } from "./signin";
export { signOut } from "./signout";
export { uploadToImageKit } from "./profile";
export { deleteExpense } from "./category";
export type { FormState as ProfileFormState } from "./profile";

// export async function createCategory(name: string, allocatedAmount: number) {
//   await db.expenseCategory.create({
//     data: {
//       name,
//       allocatedAmount,

//     },
//   });

//   revalidatePath("/");
//   redirect("/");

// }

// export async function deleteSnippet(id: number) {
//   await db.snippet.delete({
//     where: { id },
//   });

//   revalidatePath("/");
//   redirect("/");
// }

// export async function createSnippet(
//   formState: { message: string },
//   formData: FormData
// ) {
//   try {
//     //Check the user's inputs and make sure they're valid
//     const title = formData.get("title");
//     const code = formData.get("code");

//     if (typeof title !== "string" || title.length < 3) {
//       return {
//         message: "Title must be longer",
//       };
//     }
//     if (typeof code !== "string" || code.length < 10) {
//       return {
//         message: "Code must be longer",
//       };
//     }

//     // Create a new record in the database
//     await db.snippet.create({
//       data: {
//         title,
//         code,
//       },
//     });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return {
//         message: err.message,
//       };
//     } else {
//       return {
//         message: "Something went wrong.",
//       };
//     }
//   }
//   // Redirect the user to the new snippet's page
//   revalidatePath("/");
//   redirect("/");
// }
