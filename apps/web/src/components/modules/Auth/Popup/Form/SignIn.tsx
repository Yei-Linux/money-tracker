import { FormProvider } from 'react-hook-form';

import { ButtonAuthSteps } from '@moneytrack/web/components/modules/@shared/Auth/ButtonAuthSteps';
import { EmailWithPassAuthStep } from '@moneytrack/web/components/modules/@shared/Auth/EmailWithPassAuthStep';
import { useSignInUserForm } from '@moneytrack/web/hooks/useSignInUserForm';

export const SignInForm = () => {
  const methods = useSignInUserForm();

  return (
    <FormProvider {...methods}>
      <form
        className="[&_button]:![box-shadow:none]  [&_input]:![box-shadow:none]"
        action="#"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
      >
        <EmailWithPassAuthStep />

        <ButtonAuthSteps type="final" isLoading={methods.isLoading} />
      </form>
    </FormProvider>
  );
};
