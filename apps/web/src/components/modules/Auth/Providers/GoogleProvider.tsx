import { Button } from '@moneytrack/web/components/ui/button';
import { GoogleIcon } from '@moneytrack/web/components/ui/icons/GoogleIcon';
import { signIn } from '@moneytrack/web/lib/auth/auth';
import { useAuthFormStore } from '@moneytrack/web/store/auth-form';
import { AuthStatesForm } from '@moneytrack/web/types/auth';

const gmailText: Record<AuthStatesForm, string> = {
  signin: 'Continue with Gmail',
  signup: 'Register with Gmail',
};

export const GoogleProvider = () => {
  const authState = useAuthFormStore((store) => store.state);
  const callbackUrl = useAuthFormStore((state) => state.callbackUrl);
  const text = gmailText[authState];
  const handleGoogleAuth = () =>
    signIn('google', { callbackUrl, redirect: false });

  return (
    <Button
      className="bg-white text-black border hover:bg-white hover:text-black flex gap-3"
      onClick={handleGoogleAuth}
    >
      <GoogleIcon />
      <span>{text}</span>
    </Button>
  );
};
