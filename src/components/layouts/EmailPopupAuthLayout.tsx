import { useAuthFormStore } from '@/store/auth-form';
import { FC, PropsWithChildren } from 'react';
import { DialogTitle, DialogHeader, DialogDescription } from '../ui/dialog';
import { ReplyIcon } from 'lucide-react';

type EmailPopupAuthLayout = PropsWithChildren;

export const EmailPopupAuthLayout: FC<EmailPopupAuthLayout> = ({
  children,
}) => {
  const previousStep = useAuthFormStore((store) => store.previousStep);
  const authState = useAuthFormStore((store) => store.state);
  const title = authState === 'signin' ? 'Continue' : 'Register';

  return (
    <div className="flex flex-col gap-10">
      <DialogHeader className="flex flex-col gap-3">
        <button
          type="button"
          onClick={previousStep}
          className="flex gap-1 items-center text-sm text-muted-foreground"
        >
          <ReplyIcon size={20} /> <span>Back</span>
        </button>
        <div className="flex flex-col gap-2">
          <DialogTitle>{title} with your email</DialogTitle>
          <DialogDescription>Are you ready?</DialogDescription>
        </div>
      </DialogHeader>

      {children}
    </div>
  );
};
