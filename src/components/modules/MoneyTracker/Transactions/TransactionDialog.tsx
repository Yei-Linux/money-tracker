import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TransactionForm } from './TransactionForm';

export const TransactionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full p-2">+ Add</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md flex flex-col gap-7">
        <DialogHeader>
          <DialogTitle>Add your transaction</DialogTitle>
          <DialogDescription>
            Please full all fields to have more details for you
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <TransactionForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
