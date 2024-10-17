import { putIncomesGoalServerAction } from '@moneytrack/web/server-actions/settings/put-incomes-goal';
import {
  IncomesGoalZodSchema,
  TIncomesGoalSchema,
} from '@moneytrack/web/validators/incomes-goal.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { toastMessages } from '@moneytrack/shared/constants';
import { useDropdownsStore } from '../store/dropdowns';

type UsePutExpenseLimitForm = {
  incomesGoal: number;
  togglePopup: () => void;
};

export const usePutIncomesGoalForm = ({
  incomesGoal,
  togglePopup,
}: UsePutExpenseLimitForm) => {
  const { refresh } = useRouter();
  const month = useDropdownsStore((store) => store.month);
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
        await putIncomesGoalServerAction(data, month);

        refresh();
        togglePopup();
        toast.success(toastMessages.SET_INCOME_GOAL_SUCCESS);
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { isLoading, register, handleSubmit, errors, onSubmit };
};
