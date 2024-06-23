import { Content } from 'mailgen';
import { MailGenerator } from '../mailgenerator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailsConfig } from 'src/core/config/emails.config';
import { AppConfig } from 'src/core/config/app.config';

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
    this.from = this.config.get<EmailsConfig>('emailsConfig')!.emailFrom;
    this.subject = `Welcome to ${this.config.get<AppConfig>('appConfig')?.appName}`;

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
