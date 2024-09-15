import sgMail from '@sendgrid/mail';
import { EmailProvider } from '../types';

export class SendGridProxy implements EmailProvider {
  constructor() {
    sgMail.setApiKey(process.env['SEND_GRID_API_KEY']!);
  }

  async send(email: string, body: string, subject: string) {
    const msg = {
      to: email,
      from: process.env['SEND_GRID_API_SENDER']!,
      subject,
      text: body,
    };

    sgMail.send(msg);
  }
}

export const sendGridProxy = () => new SendGridProxy();
