import { envs } from '@moneytrack/web/constants/env';
import { PAYMENT_STATE } from '@moneytrack/web/constants/payments';
import MercadoPagoConfig, { Payment, PreApproval } from 'mercadopago';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';
import { PreApprovalResponse } from 'mercadopago/dist/clients/preApproval/commonTypes';

export class MercadoPago {
  private mercadopago: MercadoPagoConfig;
  private isTesting = true;
  private testInfo = {
    email: 'test_user_71867124@testuser.com',
  };

  constructor() {
    this.mercadopago = new MercadoPagoConfig({
      accessToken: envs.MP_ACCESS_TOKEN,
    });
  }

  async suscribe({
    email,
    reason,
    amount,
    planId,
  }: {
    email: string;
    reason: string;
    amount: number;
    planId: string;
  }): Promise<string> {
    const suscription = await new PreApproval(this.mercadopago).create({
      body: {
        back_url: envs.MP_APP_URL,
        reason,
        external_reference: JSON.stringify({ planId, email }),
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: amount,
          currency_id: 'PEN',
        },
        payer_email: this.isTesting ? this.testInfo.email : email,
        status: 'pending',
      },
    });

    return suscription.init_point!;
  }

  async getSuscription(
    paymentSubscriptionId: string
  ): Promise<PreApprovalResponse> {
    const preapproval = await new PreApproval(this.mercadopago).get({
      id: paymentSubscriptionId,
    });

    return preapproval;
  }

  async updateSuscription({
    reason,
    amount,
    paymentSubscriptionId,
  }: {
    reason: string;
    amount: number;
    paymentSubscriptionId: string;
  }) {
    const preApprovalUpdated = await new PreApproval(this.mercadopago).update({
      id: paymentSubscriptionId,
      body: {
        reason,
        auto_recurring: {
          transaction_amount: amount,
          currency_id: 'PEN',
        },
      },
    });

    return preApprovalUpdated;
  }

  async cancellSuscription(paymentSubscriptionId: string) {
    const preApprovalUpdated = await new PreApproval(this.mercadopago).update({
      id: paymentSubscriptionId,
      body: { status: PAYMENT_STATE.CANCELLED },
    });

    return preApprovalUpdated;
  }

  async getPayment(paymentId: string): Promise<PaymentResponse> {
    const payment = await new Payment(this.mercadopago).get({ id: paymentId });

    return payment;
  }
}

export const mercadoPagoLib = () => new MercadoPago();
