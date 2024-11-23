import { userModel } from '@moneytrack/shared/models';
import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { mercadoPagoLib } from '@moneytrack/web/lib/payment/mercadopago';

export async function POST(request: NextRequest) {
  try {
    const body: { data: { id: string }; type: string; id: string } =
      await request.json();

    if (body.type === 'subscription_preapproval') {
      const preapproval = await mercadoPagoLib().getSuscription(body.data.id);
      const payment = await mercadoPagoLib().getPayment(body.id);

      const email = preapproval.payer_email;
      const planId = preapproval.external_reference;
      const cardMask = `**** **** **** ${payment.card?.last_four_digits}`;
      const cardId = payment.card?.id;

      if (preapproval.status === 'authorized' && email && planId) {
        await userModel.updateOne({ email }, { planId });
      }
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    return catchApiError(error);
  }
}
