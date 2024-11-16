import { z } from 'zod';
import { AuthZodSchema, UserZodSchema } from './common.validator';

function checkFileType(file: File) {
  if (file.name) {
    const fileType = file.name.split('.').pop();
    if (!fileType) return false;
    if (['png', 'jpg', 'jpeg', 'webp'].includes(fileType)) return true;
  }
  return false;
}

export const ProfileZodSchema = z
  .object({
    image: z
      .instanceof(File, { message: 'Please upload a file' })
      .refine((f) => f.size < 100_000, 'Max 100 kB upload size')
      .refine((file) => checkFileType(file), 'Only images are supported.')
      .optional(),
    country: z
      .string()
      .min(3, { message: 'Min required is 3 characters' })
      .optional(),
    address: z
      .string()
      .min(3, { message: 'Min required is 3 characters' })
      .optional(),
  })
  .merge(UserZodSchema.merge(AuthZodSchema.omit({ password: true })));

export type TProfileSchema = z.infer<typeof ProfileZodSchema>;
