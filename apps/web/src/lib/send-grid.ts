import sgMail from '@sendgrid/mail';
import { EmailProvider } from '@moneytrack/web/types/lib/send-grid';
import { envs } from '@moneytrack/web/constants/env';

export class SendGridProxy implements EmailProvider {
  constructor() {
    sgMail.setApiKey(envs.SEND_GRID_API_KEY);
  }

  async send(email: string, body: string, subject: string) {
    const msg = {
      to: email,
      from: envs.SEND_GRID_API_SENDER,
      subject,
      text: body,
    };

    sgMail.send(msg);
  }
}

export const sendGridProxy = () => new SendGridProxy();
