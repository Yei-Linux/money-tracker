import zod from 'zod';

export const SignUpZodSchema = zod.object({
  email: zod
    .string({ message: 'Email is required' })
    .email('Should be an email'),
  name: zod.string({ message: 'Name is required' }),
  phone: zod
    .string({ message: 'Phone is required' })
    .min(9, 'Min required is 9 characters')
    .max(12, 'Max required is 12 characters'),
});

export type TSignUpSchema = zod.infer<typeof SignUpZodSchema>;
