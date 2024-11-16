import { PASSWORD_VALIDATOR_SETTINGS } from '@moneytrack/web/constants';
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

export const UserZodSchema = zod.object({
  name: zod
    .string({ message: 'Name is required' })
    .min(3, { message: 'Min required is 3 characters' }),
  phone: zod
    .string({ message: 'Phone is required' })
    .min(9, 'Min required is 9 characters')
    .max(12, 'Max required is 12 characters'),
});
