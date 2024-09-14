'use client';
import { AuthPopup } from './Popup';
import { useAuthStore } from '@/store/auth';

export const AuthActions = () => {
  const session = useAuthStore((store) => store.session);

  return <>{!session && <AuthPopup />}</>;
};
