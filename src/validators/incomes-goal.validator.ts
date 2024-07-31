import { z } from 'zod';

export const IncomesGoalZodSchema = z.object({
  incomesGoal: z.coerce
    .number({ message: 'Incomes Goal is required' })
    .min(1, { message: 'Incomes Goal should be at least 1' }),
});

export type TIncomesGoalSchema = z.infer<typeof IncomesGoalZodSchema>;
