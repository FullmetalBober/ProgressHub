'use server';

import prisma from '../db';
import { protectAction } from '../protection';
import { deleteImage, uploadImage } from '../store';

export async function updateUserImage(id: string, imageFormData: FormData) {
  await protectAction({
    userId: id,
  });

  const file = imageFormData.get('image');
  if (!file) throw new Error('No file found');
  if (!(file instanceof File)) throw new Error('Invalid file type');

  const [user, image] = await Promise.all([
    prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        image: true,
      },
    }),
    uploadImage(`user/${id}.webp`, file),
  ]);

  const [response] = await Promise.all([
    prisma.user.update({
      where: {
        id,
      },
      data: {
        image,
      },
    }),
    deleteImage(user.image),
  ]);

  return response;
}
