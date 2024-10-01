import { ButtonAuthSteps } from '@moneytrack/web/components/modules/@shared/Auth/ButtonAuthSteps';
import { EmailWithPassAuthStep } from '@moneytrack/web/components/modules/@shared/Auth/EmailWithPassAuthStep';
import { useSignUpUserForm } from '@moneytrack/web/hooks/useSIgnUpUserForm';
import { useAuthFormStore } from '@moneytrack/web/store/auth-form';
import { FormProvider } from 'react-hook-form';
import { PersonalInformation } from './PersonalInformationStep';
import { INTIAL_STEP, MAX_AUTH_FORM_STEP } from '@moneytrack/web/constants';
import { TSignUpSchema } from '@moneytrack/web/validators/sign-up.validator';

export const SignUpForm = () => {
  const signUpStep = useAuthFormStore((store) => store.signUpStep);
  const isFirstStep = signUpStep === INTIAL_STEP;
  const isFinalStep = signUpStep === MAX_AUTH_FORM_STEP;
  const buttonType = isFinalStep ? 'final' : 'continue';

  const previousSignUpStep = useAuthFormStore(
    (store) => store.previousSignUpStep
  );
  const nextSignUpStep = useAuthFormStore((store) => store.nextSignUpStep);

  const methods = useSignUpUserForm();

  const steps = [
    { component: <EmailWithPassAuthStep />, keys: ['email', 'password'] },
    { component: <PersonalInformation />, keys: ['name', 'phone'] },
  ];

  const handleNext = async () => {
    const { keys } = steps[signUpStep];

    const isValid = await methods.trigger(keys as (keyof TSignUpSchema)[]);
    if (!isValid) return;

    nextSignUpStep();
  };

  return (
    <FormProvider {...methods}>
      <form
        action="#"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
        className="[&_button]:![box-shadow:none]  [&_input]:![box-shadow:none]"
      >
        {steps[signUpStep].component}

        <ButtonAuthSteps
          isLoading={methods.isLoading}
          hasBackButton={!isFirstStep}
          onPrev={previousSignUpStep}
          onNext={handleNext}
          type={buttonType}
          key={buttonType}
        />
      </form>
    </FormProvider>
  );
};
