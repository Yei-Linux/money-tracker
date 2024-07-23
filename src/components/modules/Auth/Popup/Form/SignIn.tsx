import { ButtonAuthSteps } from '@/components/modules/shared/Auth/ButtonAuthSteps';
import { EmailWithPassAuthStep } from '@/components/modules/shared/Auth/EmailWithPassAuthStep';

export const SignInForm = () => {
  return (
    <form action="#">
      <EmailWithPassAuthStep />

      <ButtonAuthSteps type="final" />
    </form>
  );
};
