"use server";

export const uploadToImageKit = (file: File, name: string) => {
  const url = "https://upload.imagekit.io/api/v1/files/upload";
  const headers = new Headers({
    Authorization: `Basic ${btoa(`${process.env.IMAGEKIT_PRIVATE_KEY}:`)}`,
  });

  // Post the file to imagekit with fetch api
  // and return the response

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", name);
  formData.append("folder", "/expense-tracker/avatars");

  return fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });
};

export interface FormState {
  message: string;
}
