'use client';

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
import { usePutExpenseLimitForm } from '@moneytrack/web/hooks/usePutExpenseLimitForm';
import { FC, PropsWithChildren } from 'react';

type ExpenseLimitPopup = PropsWithChildren<{ goal: number }>;

export const ExpenseLimitPopup: FC<ExpenseLimitPopup> = ({
  children,
  goal,
}) => {
  const { active, toggle } = useToggle({ defaultValue: false });
  const { register, errors, handleSubmit, onSubmit, isLoading } =
    usePutExpenseLimitForm({
      expenseLimit: goal,
      togglePopup: toggle,
    });
  const action: () => void = handleSubmit(onSubmit);

  return (
    <Dialog open={active} onOpenChange={toggle}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="[&_input]:![box-shadow:none]">
        <DialogHeader>
          <DialogTitle>What will be your expense limit this month?</DialogTitle>
          <DialogDescription>
            This action will allow you to define your expense limit this month!
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-3" action={action}>
          <FormField error={errors.expenseLimit?.message} required>
            <Input
              {...register('expenseLimit')}
              type="number"
              placeholder="Put your expense limit"
            />
          </FormField>
          <Button className="w-full" type="submit" loading={isLoading}>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
