'use client';

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useAuthFormStore } from '@/store/auth-form';
import { AuthStatesForm } from '@/types/auth';

type AuthItemFormText = {
  title: string;
  description: string;
  actionText: string;
};

export const AuthFormText: Record<AuthStatesForm, AuthItemFormText> = {
  signin: {
    title: 'Sign in to your account',
    description: "Don't have an account?",
    actionText: 'Join here',
  },
  signup: {
    title: 'Create a new account',
    description: 'Already have an account?',
    actionText: 'Sign in',
  },
};

export const FormHeader = () => {
  const authState = useAuthFormStore((store) => store.state);
  const switchAuthOption = useAuthFormStore((store) => store.switchState);
  const { title, description, actionText } = AuthFormText[authState];

  return (
    <DialogHeader className="flex flex-col gap-2">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
        {description}
        <button className="underline ml-[1px]" onClick={switchAuthOption}>
          {actionText}
        </button>
      </DialogDescription>
    </DialogHeader>
  );
};
