'use client';

import { useInitSessionStore } from '@moneytrack/web/hooks/@shared/useInitSessionStore';
import { FC, PropsWithChildren } from 'react';

type SessionWrapper = PropsWithChildren;

export const SessionWrapper: FC<SessionWrapper> = ({ children }) => {
  useInitSessionStore();

  return <>{children}</>;
};
