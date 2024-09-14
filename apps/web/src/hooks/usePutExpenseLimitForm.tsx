import { putExpenseLimitServerAction } from '@moneytrack/web/server-actions/settings/put-expense-limit';
import {
  ExpenseLimitZodSchema,
  TExpenseLimitSchema,
} from '@moneytrack/web/validators/expense-limit.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type UsePutExpenseLimitForm = {
  expenseLimit: number;
  togglePopup: () => void;
};

export const usePutExpenseLimitForm = ({
  expenseLimit,
  togglePopup,
}: UsePutExpenseLimitForm) => {
  const { refresh } = useRouter();
  const [isLoading, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TExpenseLimitSchema>({
    defaultValues: { expenseLimit },
    resolver: zodResolver(ExpenseLimitZodSchema),
  });

  const onSubmit = async (data: TExpenseLimitSchema) => {
    startTransition(async () => {
      try {
        await putExpenseLimitServerAction(data);

        refresh();
        togglePopup();
        toast.success('Expense Limit updated successfuly');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { isLoading, register, handleSubmit, errors, onSubmit };
};
