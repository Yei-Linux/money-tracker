import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { PaymentWebhookPayload } from '@moneytrack/web/types/payment';
import { paymentSuscriptionUseCase } from '@moneytrack/web/use-cases/payment-suscription';

export async function POST(request: NextRequest) {
  try {
    const body: PaymentWebhookPayload = await request.json();

    if (body.type === 'subscription_preapproval')
      await paymentSuscriptionUseCase(body);

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return catchApiError(error);
  }
}
