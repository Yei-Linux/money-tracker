import zod from 'zod';
import { AuthZodSchema, UserZodSchema } from './common.validator';

export const SignUpZodSchema = UserZodSchema.merge(AuthZodSchema);

export type TSignUpSchema = zod.infer<typeof SignUpZodSchema>;
