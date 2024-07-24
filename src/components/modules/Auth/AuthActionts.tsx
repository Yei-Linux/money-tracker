'use client';
import { useAuthSession } from '@/hooks/useAuthSession';
import { AuthPopup } from './Popup';

export const AuthActions = () => {
  const { user } = useAuthSession();

  return <>{!user && <AuthPopup />}</>;
};
