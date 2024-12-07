'use server';

import { userModel } from '@moneytrack/shared/models';
import { PAYMENT_STATE } from '@moneytrack/web/constants/payments';
import { PaymentError } from '@moneytrack/web/errors/PaymentError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { mercadoPagoLib } from '@moneytrack/web/lib/payment/mercadopago';

export const cancelSubscriptionServerAction = async () => {
  try {
    const user = await getAuthSessionInServerAction();
    const userFound = await userModel.findOne({ _id: user });
    if (!userFound) throw new Error('User not found');

    const paymentSubscriptionId = userFound?.paymentSubscriptionId;
    if (!paymentSubscriptionId) throw new Error('Subscription not found');

    const initPoint = await mercadoPagoLib().cancellSuscription(
      paymentSubscriptionId
    );
    if (initPoint.status !== PAYMENT_STATE.CANCELLED)
      throw new Error('Subscription could not be cancelled');

    await userModel.updateOne(
      { _id: user },
      { plan: null, paymentSubscriptionId: null }
    );
  } catch (error) {
    throw new PaymentError((error as Error).message);
  }
};
