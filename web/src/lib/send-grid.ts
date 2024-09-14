import sgMail from "@sendgrid/mail";
import { EmailProvider } from "@/types/lib/send-grid";
import { envs } from "@/constants/env";

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
