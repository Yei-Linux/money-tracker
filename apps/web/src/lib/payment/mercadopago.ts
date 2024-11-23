import { envs } from '@moneytrack/web/constants/env';
import MercadoPagoConfig, { PreApproval } from 'mercadopago';

export class MercadoPago {
  private mercadopago: MercadoPagoConfig;
  constructor() {
    this.mercadopago = new MercadoPagoConfig({
      accessToken: envs.MP_ACCESS_TOKEN,
    });
  }

  async suscribe({
    email,
    reason,
    amount,
  }: {
    email: string;
    reason: string;
    amount: number;
  }): Promise<string> {
    const suscription = await new PreApproval(this.mercadopago).create({
      body: {
        back_url: envs.MP_APP_URL,
        reason,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: amount,
          currency_id: 'PEN',
        },
        payer_email: email,
        status: 'pending',
      },
    });

    return suscription.init_point!;
  }
}

export const mercadoPagoLib = () => new MercadoPago();
