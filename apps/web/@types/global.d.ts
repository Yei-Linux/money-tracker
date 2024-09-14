import { UserSession } from '@moneytrack/web/types/auth';
import { NextRequest as OriginalNextRequest } from 'next/server';
import { Session as OriginalSession } from 'next-auth';

declare global {
  declare interface NextRequest extends OriginalNextRequest {
    user: UserSession;
  }
}
