import { createTransactionServerAction } from '@moneytrack/web/server-actions/transactions/create';

import {
  CreateTransactionZodSchema,
  TCreateTransactionTypeSchema,
} from '@moneytrack/web/validators/createTransaction.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type UseCreateTransactionForm = {
  onComplete?: () => void;
};

export const useCreateTransactionForm = ({
  onComplete,
}: UseCreateTransactionForm) => {
  const [isLoading, startTransition] = useTransition();
  const { refresh } = useRouter();
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
    startTransition(async () => {
      try {
        await createTransactionServerAction(data);
        await queryClient.invalidateQueries({ queryKey: ['transactions'] });
        await queryClient.invalidateQueries({
          queryKey: ['transactions/short-resume'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['transactions/stats'],
        });
        refresh();
        onComplete?.();
        toast.success('Your transaction was added sucessfully');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { register, handleSubmit, onSubmit, errors, control, isLoading };
};
