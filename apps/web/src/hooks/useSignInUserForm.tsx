import { SignInError } from '@moneytrack/web/errors/SignInError';
import { signIn } from '@moneytrack/web/lib/auth/auth';
import { AuthLibSignInServer } from '@moneytrack/web/types/auth';
import {
  SignInZodSchema,
  TSignInSchema,
} from '@moneytrack/web/validators/sign-in.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { toastMessages } from '@moneytrack/shared/constants';

export const useSignInUserForm = () => {
  const { refresh } = useRouter();
  const [isLoading, startTransition] = useTransition();
  const methods = useForm<TSignInSchema>({
    resolver: zodResolver(SignInZodSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    startTransition(async () => {
      try {
        const response: AuthLibSignInServer | undefined = await signIn(
          'credentials',
          {
            email: data.email,
            password: data.password,
            redirect: false,
          }
        );

        if (!response) {
          throw new SignInError(
            toastMessages.SIGN_IN_ERROR_WHEN_IS_GENERAL_ERROR
          );
        }
        if (response.error) {
          throw new SignInError(
            toastMessages.SIGN_IN_ERROR_WHEN_CREDENTIALS_ARE_INCORRET
          );
        }

        refresh();
        toast.success(toastMessages.SIGN_IN_SUCCESS);
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { ...methods, onSubmit, isLoading };
};
