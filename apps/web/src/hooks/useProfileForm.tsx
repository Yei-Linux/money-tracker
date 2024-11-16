import { zodResolver } from '@hookform/resolvers/zod';
import { toastMessages } from '@moneytrack/shared/constants';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  ProfileZodSchema,
  TProfileSchema,
} from '../validators/profile.validator';

type UseProfileForm = { defaultValues: Omit<TProfileSchema, 'image'> };

export const useProfileForm = ({ defaultValues }: UseProfileForm) => {
  const [isLoading, startTransition] = useTransition();
  const { refresh } = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileZodSchema),
    defaultValues,
  });

  const onSubmit = async (data: TProfileSchema) => {
    startTransition(async () => {
      try {
        refresh();
        toast.success(toastMessages.UPDATE_PROFILE_SUCCESS);
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    control,
    isLoading,
    watch,
  };
};
