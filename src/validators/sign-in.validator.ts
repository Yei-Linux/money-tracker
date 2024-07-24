import zod from 'zod';
import { AuthZodSchema } from './common.validator';

export const SignInZodSchema = zod.object({}).merge(AuthZodSchema);

export type TSignInSchema = zod.infer<typeof SignInZodSchema>;
