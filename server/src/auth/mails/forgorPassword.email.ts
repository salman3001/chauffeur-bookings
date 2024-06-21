import { NestMail } from '@salman3001/nest-mailer';
import Mailgen, { Content } from 'mailgen';
import { Config } from 'src/core/config/config';
import { mailGenerator } from 'src/core/utils/mailGenerator';

interface ForgorPasswordEmailPayload {
  name: string;
  link: string;
}

export class ForgorPasswordEmail implements NestMail {
  config: Config;
  mailGen: Mailgen;
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;

  constructor(to: string, payload: ForgorPasswordEmailPayload) {
    this.config = new Config();
    this.mailGen = mailGenerator(this.config);
    this.to = to;
    this.from = this.config.envs().EMAIL_FROM;
    this.subject = 'Forgot password?';
    this.setHtml(payload);
  }

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
    this.html = this.mailGen.generate(mail);
    this.text = this.mailGen.generatePlaintext(mail);
  }
}
