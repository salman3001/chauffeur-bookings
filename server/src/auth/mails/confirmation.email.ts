import { NestMail } from '@salman3001/nest-mailer';
import Mailgen, { Content } from 'mailgen';
import { Config } from 'src/core/config/config';
import { mailGenerator } from 'src/core/utils/mailGenerator';

interface ConfirmationEmailPayload {
  name: string;
  link: string;
}

export class ConfirmationEmail implements NestMail {
  config: Config;
  mailGen: Mailgen;
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;

  constructor(to: string, payload: ConfirmationEmailPayload) {
    this.config = new Config();
    this.mailGen = mailGenerator(this.config);
    this.to = to;
    this.from = this.config.envs().EMAIL_FROM;
    this.subject = `Welcome to ${this.config.envs().APP_NAME}`;
    this.setHtml(payload);
  }

  setHtml(payload: ConfirmationEmailPayload): void {
    const mail: Content = {
      body: {
        name: payload.name,
        title: `Welcome to ${this.config.envs().APP_NAME}`,
        intro: 'Your account has been created successfully!',
        action: {
          instructions: 'Click to verify your email',
          button: {
            color: '#22BC66', // otpional action button color
            text: 'Verify Email',
            link: payload.link,
          },
        },
      },
    };
    this.html = this.mailGen.generate(mail);
    this.text = this.mailGen.generatePlaintext(mail);
  }
}
