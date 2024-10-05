'use client';

import { Button } from '@moneytrack/web/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@moneytrack/web/components/ui/dialog';
import { TransactionForm } from './TransactionForm';
import { useToggle } from '@moneytrack/web/hooks/@shared/useToggle';
import { elementTestIds } from '@moneytrack/shared/constants';

export const TransactionDialog = () => {
  const { active, toggle } = useToggle({ defaultValue: false });

  return (
    <Dialog open={active} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button
          data-testid={elementTestIds.ADD_POPUP_TRANSACTION_BTN_ELEMENT}
          className="rounded-full p-2"
        >
          + Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md flex flex-col gap-7">
        <DialogHeader>
          <DialogTitle>Add your transaction</DialogTitle>
          <DialogDescription>
            Please full all fields to have more details for you
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <TransactionForm toggle={toggle} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
