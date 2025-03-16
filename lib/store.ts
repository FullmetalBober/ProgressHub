import sharp from 'sharp';
import { UTApi, UTFile } from 'uploadthing/server';

const utapi = new UTApi();

export async function uploadImage(name: string, file: File) {
  const optimizedFile = await sharp(await file.arrayBuffer())
    .resize(256, 256)
    .webp()
    .toArray();

  const utFile = new UTFile(optimizedFile, name);
  const response = await utapi.uploadFiles(utFile);

  return response.data?.key;
}

export async function deleteImage(key: string) {
  return utapi.deleteFiles(key);
}
