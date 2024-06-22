import { ConfigService } from '@salman3001/nest-config-module';
import { Content } from 'mailgen';
import { Config } from 'src/core/config/config';
import { MailGenerator } from '../mailgenerator';
import { Injectable } from '@nestjs/common';

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
    this.from = this.config.get<Config>().envs().EMAIL_FROM;
    this.subject = `Welcome to ${this.config.get<Config>().envs().APP_NAME}`;

    const mail: Content = {
      body: {
        name: payload.name,
        title: `Welcome to ${this.config.get<Config>().envs().APP_NAME}`,
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
