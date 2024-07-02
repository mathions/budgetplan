"use server";

import { put, del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { updateImage } from "@/services/auth";

export async function uploadImage(token: string, image: string, formData: FormData) {
  const imageFile = formData.get('image') as File;
  if(image) {
    await del(image);
  }
  const blob = await put(imageFile.name, imageFile, {
    access: 'public',
  });
  const res = await updateImage(token, blob.url);
  revalidatePath('/');
  return res;
}