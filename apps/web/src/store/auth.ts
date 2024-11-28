import { Nullable } from '@moneytrack/web/types/@shared/nullable';
import { UserSession } from '@moneytrack/web/types/auth';
import { create } from 'zustand';

type UseAuthStore = {
  setSession: (session: Nullable<Partial<UserSession>>) => void;
  setIsLoading: (isLoading: boolean) => void;
  session?: Nullable<Partial<UserSession>>;
  isLoading?: boolean;
};

export const useAuthStore = create<UseAuthStore>((set, get) => ({
  isLoading: true,
  setSession: (session) =>
    set(() => ({
      session,
    })),
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
}));
