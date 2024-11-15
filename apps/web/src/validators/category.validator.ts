import z from 'zod';

export const CategoryZodSchema = z.object({
  category: z.string({ message: 'Category is required' }),
  transactionType: z.string({ message: 'Transaction Type is required' }),
});

export type TCategorySchema = z.infer<typeof CategoryZodSchema>;
