import { Content } from 'mailgen';
import { MailGenerator } from '../mailgenerator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailsConfig } from 'src/config/emails.config';
import { AppConfig } from 'src/config/app.config';

export interface AccountCreatedEmailPayload {
  name: string;
  link: string;
}

@Injectable()
export class AccountCreatedEmail {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;

  constructor(
    private config: ConfigService,
    private mailGenerator: MailGenerator,
  ) {}

  create(to: string, payload: AccountCreatedEmailPayload) {
    this.to = to;
    this.from = this.config.get<EmailsConfig>('emailsConfig')!.emailFrom;
    this.subject = `Welcome to ${this.config.get<AppConfig>('appConfig')!.appName}`;

    const mail: Content = {
      body: {
        name: payload.name,
        title: `Welcome to ${this.config.get<AppConfig>('appConfig')!.appName}`,
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
    this.html = this.mailGenerator.mg.generate(mail);
    this.text = this.mailGenerator.mg.generatePlaintext(mail);
    return this;
  }
}
