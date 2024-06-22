import { ConfigService } from '@salman3001/nest-config-module';
import { Content } from 'mailgen';
import { Config } from 'src/core/config/config';
import { MailGenerator } from '../mailgenerator';
import { Injectable } from '@nestjs/common';

export interface ForgotPasswordEmailPayload {
  name: string;
  link: string;
}

@Injectable()
export class ForgotPasswordEmail {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;

  constructor(
    private config: ConfigService,
    private mailGenerator: MailGenerator,
  ) {}

  create(to: string, payload: ForgotPasswordEmailPayload) {
    this.to = to;
    this.from = this.config.get<Config>().envs().EMAIL_FROM;
    this.subject = `Welcome to ${this.config.get<Config>().envs().APP_NAME}`;

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
    this.html = this.mailGenerator.mg.generate(mail);
    this.text = this.mailGenerator.mg.generatePlaintext(mail);
    return this;
  }
}
