import userModel from '@moneytrack/shared/models/user.model';
import { mercadoPagoLib } from '../lib/payment/mercadopago';
import { PaymentWebhookPayload } from '../types/payment';
import { cardsModel, paymenstModel } from '../models';

export const paymentSuscriptionUseCase = async (
  body: PaymentWebhookPayload
) => {
  const preapproval = await mercadoPagoLib().getSuscription(body.data.id);
  const payment = await mercadoPagoLib().getPayment(body.id);

  const email = preapproval.payer_email;
  const planId = preapproval.external_reference;
  const cardMask = `**** **** **** ${payment.card?.last_four_digits}`;
  const cardId = payment.card?.id;
  const cartType = payment.payment_method?.type;

  const transaction = payment.description!;
  const pricing = payment.transaction_amount;

  if (preapproval.status === 'authorized' && email && planId) {
    const userFound = await userModel.findOne({ email });
    const user = userFound._id;

    await cardsModel.findOneAndUpdate(
      { cardId, user },
      { type: cartType, mask: cardMask, cardId, active: true, user },
      { upsert: true }
    );
    await paymenstModel.create({
      transaction,
      user,
      plan: planId,
      pricing,
      cardMask,
    });
    await userModel.updateOne({ _id: user }, { planId });
  }
};
