import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'bbb303c399ebcb',
    pass: '9ea28ca13b60d0',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedback <oi@feedback.com>',
      to: 'Bruno Castro <miroldols@gmail.com>',
      subject,
      html: body,
    });
  }
}
