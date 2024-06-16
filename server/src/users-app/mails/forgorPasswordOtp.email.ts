import { NestMail } from '@salman3001/nest-mailer';

interface ForgorPasswordOtpEmailPayload {
  name: string;
}

export class ForgorPasswordOtpEmail implements NestMail {
  from: string = 'admin@gmail.com';
  subject: string = 'Forgot password';
  text: string;
  html: string;

  setHtml(payload: ForgorPasswordOtpEmailPayload): void {
    this.html = `<h1>Hi ${payload.name}This is a test email</h1>`;
    this.text = `Hi ${payload.name}. This is a test email`;
  }

  constructor(
    public to: string,
    payload: ForgorPasswordOtpEmailPayload,
  ) {
    this.to = to;
    this.setHtml(payload);
  }
}
