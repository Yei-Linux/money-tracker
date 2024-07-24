import { PASSWORD_VALIDATOR_SETTINGS } from '@/constants';
import zod from 'zod';

export const AuthZodSchema = zod.object({
  email: zod
    .string({ message: 'Email is required' })
    .email('Should be an email'),
  password: zod
    .string({ message: 'Password is required' })
    .min(PASSWORD_VALIDATOR_SETTINGS.min, { message: 'Min characters is 8' }),
});

export type TAuthZodSchema = zod.infer<typeof AuthZodSchema>;
