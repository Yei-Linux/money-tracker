import { INTIAL_STEP } from '@moneytrack/web/constants';
import { signUpServerAction } from '@moneytrack/web/server-actions/auth/sign-up';
import { useAuthFormStore } from '@moneytrack/web/store/auth-form';
import {
  SignUpZodSchema,
  TSignUpSchema,
} from '@moneytrack/web/validators/sign-up.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useSignUpUserForm = () => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const switchState = useAuthFormStore((store) => store.switchState);
  const setStep = useAuthFormStore((store) => store.setStep);
  const setSignUpStep = useAuthFormStore((store) => store.setSignUpStep);
  const methods = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpZodSchema),
  });

  const resetValues = () => {
    switchState('signup');
    setSignUpStep(INTIAL_STEP);
    setStep(INTIAL_STEP);
  };

  const onSubmit = (data: TSignUpSchema) => {
    startTransition(async () => {
      try {
        await signUpServerAction(data);

        resetValues();
        toast.success('You account was created successfuly');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { ...methods, onSubmit, isLoading };
};
