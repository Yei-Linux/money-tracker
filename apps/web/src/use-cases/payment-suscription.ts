import userModel from '@moneytrack/shared/models/user.model';
import { mercadoPagoLib } from '../lib/payment/mercadopago';
import { PaymentWebhookPayload } from '../types/payment';
import { cardsModel, paymenstModel } from '../models';

// TODO: Add credit card feature
export const paymentSuscriptionUseCase = async (
  body: PaymentWebhookPayload
) => {
  const paymentSubscriptionId = body.data.id;
  const preapproval = await mercadoPagoLib().getSuscription(body.data.id);
  const preApprovalId = preapproval.id;
  if (preapproval.status !== 'authorized')
    throw new Error('Unauthorized subscription');

  if (!preApprovalId) throw new Error('PreApprovalId required');
  if (!preapproval.external_reference)
    throw new Error('External payload is empty');

  const externalPayload = JSON.parse(preapproval.external_reference);
  const email: string | null = externalPayload.email;
  const planId: string | null = externalPayload.planId;
  if (!email) throw new Error('Email is empty');
  if (!planId) throw new Error('PlanId is empty');

  if (!preapproval.auto_recurring?.transaction_amount)
    throw new Error('Charged not found');

  const userFound = await userModel.findOne({ email });
  if (!userFound) throw new Error('User not found');
  if (!!userFound.plan) throw new Error('You already have a plan');

  const cardMask = '';
  const cardId = '';
  const cartType = preapproval.payment_method_id;

  const transaction = preapproval.reason;
  const pricing = +preapproval.auto_recurring?.transaction_amount;

  const user = userFound._id;

  cardId &&
    cardMask &&
    cartType &&
    (await cardsModel.findOneAndUpdate(
      { cardId, user },
      { type: cartType, mask: cardMask, cardId, active: true, user },
      { upsert: true }
    ));
  await paymenstModel.create({
    transaction,
    user,
    plan: planId,
    pricing,
    cardMask,
    paymentSubscriptionId,
  });
  await userModel.updateOne(
    { _id: user },
    { plan: planId, paymentSubscriptionId }
  );
};
