'use server';

import { PaymentError } from '@moneytrack/web/errors/PaymentError';
import { getEmailSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { mercadoPagoLib } from '@moneytrack/web/lib/payment/mercadopago';

export const mercadoPagoSuscriptionServerAction = async (
  reason: string,
  amount: number
) => {
  try {
    const email = await getEmailSessionInServerAction();

    const initPoint = await mercadoPagoLib().suscribe({
      email,
      reason,
      amount,
    });

    return initPoint;
  } catch (error) {
    throw new PaymentError((error as Error).message);
  }
};
