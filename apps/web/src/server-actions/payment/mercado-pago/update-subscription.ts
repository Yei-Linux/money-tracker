'use server';

import { userModel } from '@moneytrack/shared/models';
import { PaymentError } from '@moneytrack/web/errors/PaymentError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { mercadoPagoLib } from '@moneytrack/web/lib/payment/mercadopago';
import { plansModel } from '@moneytrack/web/models';
import { formatReasonPayment } from '@moneytrack/web/utils/payment';

export const updateSubscriptionServerAction = async (
  planIdToUpdate: string
) => {
  try {
    const user = await getAuthSessionInServerAction();
    const userFound = await userModel.findOne({ _id: user });
    if (!userFound) throw new Error('User not found');

    const paymentSubscriptionId: string = userFound?.paymentSubscriptionId;
    if (!paymentSubscriptionId) throw new Error('Subscription not found');

    const plan = await plansModel.findOne({ _id: planIdToUpdate });
    if (!plan) throw new Error('Plan not found');

    const initPoint = await mercadoPagoLib().updateSuscription({
      reason: formatReasonPayment(plan.type),
      amount: plan.price,
      paymentSubscriptionId,
    });

    if (!initPoint) throw new Error('Payment error');
  } catch (error) {
    throw new PaymentError((error as Error).message);
  }
};
