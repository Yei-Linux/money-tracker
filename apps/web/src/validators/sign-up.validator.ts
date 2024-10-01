import zod from 'zod';
import { AuthZodSchema } from './common.validator';

export const SignUpZodSchema = zod
  .object({
    name: zod
      .string({ message: 'Name is required' })
      .min(3, { message: 'Min required is 3 characters' }),
    phone: zod
      .string({ message: 'Phone is required' })
      .min(9, 'Min required is 9 characters')
      .max(12, 'Max required is 12 characters'),
  })
  .merge(AuthZodSchema);

export type TSignUpSchema = zod.infer<typeof SignUpZodSchema>;
