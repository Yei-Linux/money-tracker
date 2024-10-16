'use client';

import { useAuthStore } from '@moneytrack/web/store/auth';
import { StartAppButton } from '../../@shared/StartAppButton';
import { useAuthFormStore } from '@moneytrack/web/store/auth-form';

export const CallToAction = () => {
  const setOpen = useAuthFormStore((store) => store.setOpen);
  const session = useAuthStore((store) => store.session);

  const startApp = () => {
    if (session) return;

    setOpen(true);
  };

  return <StartAppButton onClick={startApp} />;
};
