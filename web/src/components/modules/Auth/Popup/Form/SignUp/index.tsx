import { ButtonAuthSteps } from '@/components/modules/@shared/Auth/ButtonAuthSteps';
import { EmailWithPassAuthStep } from '@/components/modules/@shared/Auth/EmailWithPassAuthStep';
import { useSignUpUserForm } from '@/hooks/useSIgnUpUserForm';
import { useAuthFormStore } from '@/store/auth-form';
import { FormProvider } from 'react-hook-form';
import { PersonalInformation } from './PersonalInformationStep';
import { MAX_AUTH_FORM_STEP } from '@/constants';

export const SignUpForm = () => {
  const signUpStep = useAuthFormStore((store) => store.signUpStep);
  const previousSignUpStep = useAuthFormStore(
    (store) => store.previousSignUpStep
  );
  const nextSignUpStep = useAuthFormStore((store) => store.nextSignUpStep);

  const methods = useSignUpUserForm();
  const action: () => void = methods.handleSubmit((data) =>
    methods.onSubmit(data)
  );

  const steps = [<EmailWithPassAuthStep />, <PersonalInformation />];
  const isFinalStep = signUpStep === MAX_AUTH_FORM_STEP;

  return (
    <FormProvider {...methods}>
      <form
        action={action}
        className="[&_button]:![box-shadow:none]  [&_input]:![box-shadow:none]"
      >
        {steps[signUpStep]}

        <ButtonAuthSteps
          isLoading={methods.isLoading}
          hasBackButton
          onPrev={previousSignUpStep}
          onNext={nextSignUpStep}
          type={isFinalStep ? 'final' : 'continue'}
        />
      </form>
    </FormProvider>
  );
};
