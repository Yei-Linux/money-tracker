import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MarketingLeftContent } from './MarketingLeftContent';
import { SignupForm } from './Form';

export const Signup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join</Button>
      </DialogTrigger>

      <DialogContent className="flex min-h-[400px] !p-0">
        <MarketingLeftContent />
        <SignupForm />
      </DialogContent>
    </Dialog>
  );
};
