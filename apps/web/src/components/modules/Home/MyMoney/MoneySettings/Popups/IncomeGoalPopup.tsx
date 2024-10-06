'use client';

import { elementTestIds } from '@moneytrack/shared/constants';
import { Button } from '@moneytrack/web/components/ui/button';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@moneytrack/web/components/ui/dialog';
import { FormField } from '@moneytrack/web/components/ui/form-field';
import { Input } from '@moneytrack/web/components/ui/input';
import { useToggle } from '@moneytrack/web/hooks/@shared/useToggle';
import { usePutIncomesGoalForm } from '@moneytrack/web/hooks/usePutIncomesGoalForm';
import { FC, PropsWithChildren } from 'react';

type IncomeGoalPopup = PropsWithChildren<{ goal: number }>;

export const IncomeGoalPopup: FC<IncomeGoalPopup> = ({ children, goal }) => {
  const { active, toggle } = useToggle({ defaultValue: false });
  const { register, errors, handleSubmit, onSubmit, isLoading } =
    usePutIncomesGoalForm({
      incomesGoal: goal,
      togglePopup: toggle,
    });
  const action: () => void = handleSubmit(onSubmit);

  return (
    <Dialog open={active} onOpenChange={toggle}>
      <DialogTrigger data-testid={elementTestIds.INCOME_GOAL_CARD_ELEMENT}>
        {children}
      </DialogTrigger>

      <DialogContent className="[&_input]:![box-shadow:none]">
        <DialogHeader>
          <DialogTitle>What will be your income goal this month?</DialogTitle>
          <DialogDescription>
            This action will allow you to define your income goal this month!
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-3" action={action}>
          <FormField error={errors.incomesGoal?.message} required>
            <Input
              {...register('incomesGoal')}
              type="number"
              placeholder="Put your incomes goal"
              data-testid={elementTestIds.INCOME_GOAL_INPUT_ELEMENT}
            />
          </FormField>
          <Button
            data-testid={elementTestIds.INCOME_GOAL_BUTTON_ELEMENT}
            className="w-full"
            type="submit"
            loading={isLoading}
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
