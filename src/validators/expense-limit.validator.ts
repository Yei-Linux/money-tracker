import { z } from 'zod';

export const ExpenseLimitZodSchema = z.object({
  expenseLimit: z.coerce
    .number({ message: 'Expense limit is required' })
    .min(1, { message: 'Expense Limit should be at least 1' }),
});

export type TExpenseLimitSchema = z.infer<typeof ExpenseLimitZodSchema>;
