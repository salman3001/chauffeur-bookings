import { NestMail } from '@salman3001/nest-mailer';
import { Content } from 'mailgen';
import { mailGenerator } from 'src/core/utils/mailGenerator';

interface ForgorPasswordEmailPayload {
  name: string;
  link: string;
}

export class ForgorPasswordEmail implements NestMail {
  from: string = 'admin@gmail.com';
  subject: string = 'Forgot password';
  text: string;
  html: string;

  setHtml(payload: ForgorPasswordEmailPayload): void {
    const mail: Content = {
      body: {
        name: payload.name,
        title: 'Forget password?',
        intro:
          'You have recieve this email because password reset request for account was recieved',
        action: {
          instructions: 'Please click to reset your password',
          button: {
            color: '#22BC66', // otpional action button color
            text: 'Reset Password',
            link: payload.link,
          },
        },
      },
    };
    this.html = mailGenerator.generate(mail);
    this.text = mailGenerator.generatePlaintext(mail);
  }

  constructor(
    public to: string,
    payload: ForgorPasswordEmailPayload,
  ) {
    this.to = to;
    this.setHtml(payload);
  }
}
