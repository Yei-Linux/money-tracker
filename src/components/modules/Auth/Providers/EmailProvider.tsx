import { Button } from '@/components/ui/button';
import { useAuthFormStore } from '@/store/auth-form';
import { AuthStatesForm } from '@/types/auth';
import { MailIcon } from 'lucide-react';

const emailText: Record<AuthStatesForm, string> = {
  signin: 'Continue with Email',
  signup: 'Register with Email',
};

export const EmailProvider = () => {
  const nextStep = useAuthFormStore((store) => store.nextStep);
  const authState = useAuthFormStore((store) => store.state);
  const text = emailText[authState];

  const handleEmailProvider = () => {
    nextStep();
  };

  return (
    <Button className="flex gap-3" onClick={handleEmailProvider}>
      <MailIcon />
      <span>{text}</span>
    </Button>
  );
};
