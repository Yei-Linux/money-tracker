import { ButtonAuthSteps } from '@/components/modules/shared/Auth/ButtonAuthSteps';
import { EmailWithPassAuthStep } from '@/components/modules/shared/Auth/EmailWithPassAuthStep';

export const SignUpForm = () => {
  return (
    <form action="#">
      <EmailWithPassAuthStep />

      <ButtonAuthSteps type="continue" />
    </form>
  );
};
