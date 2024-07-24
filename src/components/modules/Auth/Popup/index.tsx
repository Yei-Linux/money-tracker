import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MarketingLeftContent } from './MarketingLeftContent';
import { AuthForm } from './Form';
import { useAuthFormStore } from '@/store/auth-form';

export const AuthPopup = () => {
  const switchState = useAuthFormStore((store) => store.switchState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => switchState('signin')}>
          Sign In
        </Button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <Button onClick={() => switchState('signup')}>Join</Button>
      </DialogTrigger>

      <DialogContent className="flex min-h-[400px] !p-0">
        <MarketingLeftContent />
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
};
