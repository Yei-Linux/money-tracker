import userModel from '@moneytrack/shared/models/user.model';
import { mercadoPagoLib } from '../lib/payment/mercadopago';
import { PaymentWebhookPayload } from '../types/payment';
import { cardsModel, paymenstModel } from '../models';

export const paymentSuscriptionUseCase = async (
  body: PaymentWebhookPayload
) => {
  const preapproval = await mercadoPagoLib().getSuscription(body.data.id);

  if (preapproval.status !== 'authorized')
    throw new Error('Payment not authorized yet');
  if (!preapproval.external_reference)
    throw new Error('External payload is empty');

  const externalPayload = JSON.parse(preapproval.external_reference);
  const email: string | null = externalPayload.email;
  const planId: string | null = externalPayload.planId;
  if (!email) throw new Error('Email is empty');
  if (!planId) throw new Error('PlanId is empty');

  const payment = await mercadoPagoLib().getPayment(body.id);
  const cardMask = payment.card
    ? `**** **** **** ${payment.card?.last_four_digits}`
    : '';
  const cardId = payment.card?.id;
  const cartType = payment.payment_method?.type;

  const transaction = payment.description!;
  const pricing = payment.transaction_amount;

  const userFound = await userModel.findOne({ email });
  const user = userFound._id;

  cardId &&
    cartType &&
    cardMask &&
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
  });
  await userModel.updateOne({ _id: user }, { planId });
};
