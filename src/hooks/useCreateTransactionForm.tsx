import { createTransactionServerAction } from '@/server-actions/transactions/create';
import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@/validators/createTransaction.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useCreateTransactionForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCreateTransactionTypeSchema>({
    resolver: zodResolver(CreateTransactionZodSchema),
  });

  const onSubmit = async (data: TCreateTransactionTypeSchema) => {
    try {
      await createTransactionServerAction(data);
      queryClient.invalidateQueries({
        queryKey: ['transactions', 'transaction/stats'],
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return { register, handleSubmit, onSubmit, errors, control };
};
