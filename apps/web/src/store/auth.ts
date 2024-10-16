import { Nullable } from '@moneytrack/web/types/@shared/nullable';
import { UserSession } from '@moneytrack/web/types/auth';
import { create } from 'zustand';

type UseAuthStore = {
  setSession: (session: Nullable<Partial<UserSession>>) => void;
  session?: Nullable<Partial<UserSession>>;
};

export const useAuthStore = create<UseAuthStore>((set, get) => ({
  setSession: (session) =>
    set(() => ({
      session,
    })),
}));
