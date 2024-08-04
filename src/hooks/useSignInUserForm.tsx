import { SignInError } from '@/errors/SignInError';
import { signIn } from '@/lib/auth/auth';
import { AuthLibSignInServer } from '@/types/auth';
import { SignInZodSchema, TSignInSchema } from '@/validators/sign-in.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useSignInUserForm = () => {
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
          throw new SignInError('Error when user tried to sign in');
        }
        if (response.error) {
          throw new SignInError('Invalid Credentials');
        }

        toast.success('Login successfull');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { ...methods, onSubmit, isLoading };
};
