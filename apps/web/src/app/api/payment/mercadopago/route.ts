import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { PaymentWebhookPayload } from '@moneytrack/web/types/payment';
import { paymentSuscriptionUseCase } from '@moneytrack/web/use-cases/payment-suscription';

export async function POST(request: NextRequest) {
  const body: PaymentWebhookPayload = await request.json();
  console.log('Webhook status: ', body.type);
  try {
    if (body.type !== 'subscription_preapproval')
      throw new Error('Payment type not authorized');

    await paymentSuscriptionUseCase(body);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.log('Error message: ', (error as Error).message);
    return catchApiError(error);
  }
}
