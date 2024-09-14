import { useAuthFormStore } from '@moneytrack/web/store/auth-form';
import { SignUpForm } from './SignUp';
import { SignInForm } from './SignIn';
import { MainContent } from './MainContenxt';
import { EmailPopupAuthLayout } from '@moneytrack/web/components/layouts/EmailPopupAuthLayout';

export const AuthForm = () => {
  const authState = useAuthFormStore((store) => store.state);
  const authStep = useAuthFormStore((store) => store.step);

  const steps = [
    <MainContent />,
    <EmailPopupAuthLayout>
      {authState === 'signin' ? <SignInForm /> : <SignUpForm />}
    </EmailPopupAuthLayout>,
  ];
  const content = steps[authStep];

  return (
    <div className="flex flex-col justify-between gap-3 px-4 py-10">
      {content}
    </div>
  );
};
