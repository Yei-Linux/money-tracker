import zod from 'zod';

export const CreateTransactionZodSchema = zod.object({
  title: zod
    .string({ message: 'Title is required' })
    .min(3, 'Title needs a minimum of 3 characters'),
  description: zod
    .string({ message: 'Description is required' })
    .min(3, 'Description needs a minimum of 3 characters'),
  price: zod.coerce.number().int().min(1, 'Price must be minimun of 1'),
  transactionType: zod.string({ message: 'Transaction Type is required' }),
  category: zod.string({ message: 'Category is required' }),
});

export type TCreateTransactionTypeSchema = zod.infer<
  typeof CreateTransactionZodSchema
>;
