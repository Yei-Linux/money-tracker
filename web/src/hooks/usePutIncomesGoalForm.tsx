import { putExpenseLimitServerAction } from '@/server-actions/settings/put-expense-limit';
import { putIncomesGoalServerAction } from '@/server-actions/settings/put-incomes-goal';
import {
  ExpenseLimitZodSchema,
  TExpenseLimitSchema,
} from '@/validators/expense-limit.validator';
import {
  IncomesGoalZodSchema,
  TIncomesGoalSchema,
} from '@/validators/incomes-goal.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type UsePutExpenseLimitForm = {
  incomesGoal: number;
  togglePopup: () => void;
};

export const usePutIncomesGoalForm = ({
  incomesGoal,
  togglePopup,
}: UsePutExpenseLimitForm) => {
  const { refresh } = useRouter();
  const [isLoading, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TIncomesGoalSchema>({
    defaultValues: { incomesGoal },
    resolver: zodResolver(IncomesGoalZodSchema),
  });

  const onSubmit = async (data: TIncomesGoalSchema) => {
    startTransition(async () => {
      try {
        await putIncomesGoalServerAction(data);

        refresh();
        togglePopup();
        toast.success('Incomes Goal updated successfuly');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { isLoading, register, handleSubmit, errors, onSubmit };
};
