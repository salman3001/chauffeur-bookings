import { NestMail } from '@salman3001/nest-mailer';
import { Content } from 'mailgen';
import { mailGenerator } from 'src/core/utils/mailGenerator';

interface ForgorPasswordOtpEmailPayload {
  name: string;
  otp: number;
}

export class ForgorPasswordOtpEmail implements NestMail {
  from: string = 'admin@gmail.com';
  subject: string = 'Forgot password';
  text: string;
  html: string;

  setHtml(payload: ForgorPasswordOtpEmailPayload): void {
    const mail: Content = {
      body: {
        name: payload.name,
        title: 'Forget password?',
        intro:
          'You have recieve this email because password reset request for account was recieved',
        action: {
          instructions: 'Here is your otp to reset password',
          button: {
            color: '#22BC66', // otpional action button color
            text: payload.otp.toString(),
            link: '',
          },
        },
      },
    };
    this.html = mailGenerator.generate(mail);
    this.text = mailGenerator.generatePlaintext(mail);
  }

  constructor(
    public to: string,
    payload: ForgorPasswordOtpEmailPayload,
  ) {
    this.to = to;
    this.setHtml(payload);
  }
}
