import { createTransactionServerAction } from '@/server-actions/transactions/create';
import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@/validators/createTransaction.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useCreateTransactionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCreateTransactionTypeSchema>({
    resolver: zodResolver(CreateTransactionZodSchema),
  });

  const onSubmit = async (data: TCreateTransactionTypeSchema) => {
    await createTransactionServerAction(data);
  };

  return { register, handleSubmit, onSubmit, errors, control };
};
