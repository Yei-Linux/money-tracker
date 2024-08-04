import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/ui/icons/GoogleIcon';
import { signIn } from '@/lib/auth/auth';
import { useAuthFormStore } from '@/store/auth-form';
import { AuthStatesForm } from '@/types/auth';

const gmailText: Record<AuthStatesForm, string> = {
  signin: 'Continue with Gmail',
  signup: 'Register with Gmail',
};

export const GoogleProvider = () => {
  const authState = useAuthFormStore((store) => store.state);
  const text = gmailText[authState];
  const handleGoogleAuth = () => signIn('google');

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
