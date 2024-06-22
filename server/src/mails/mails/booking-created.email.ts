import { Content } from 'mailgen';
import { Config } from 'src/core/config/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@salman3001/nest-config-module';
import { MailGenerator } from '../mailgenerator';

export interface BookingCreatedEmailPayload {
  customerName: string;
}

@Injectable()
export class BookingCreatedEmail {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;

  constructor(
    private config: ConfigService,
    private mailGenerator: MailGenerator,
  ) {}

  create(to: string, payload: BookingCreatedEmailPayload) {
    this.to = to;
    this.from = this.config.get<Config>().envs().EMAIL_FROM;
    this.subject = 'Your Booking has created';

    const customerName = payload?.customerName;
    const mail: Content = {
      body: {
        name: customerName,
        title: 'Booking Created',
        intro: '',
        action: {
          instructions: `Hi, ${customerName}. Your booking has been crreated! Our chauffeur will review and send confirmation soon`,
          button: {
            color: '#22BC66', // otpional action button color
            text: 'View Booking',
            link: 'booking link',
          },
        },
      },
    };
    this.html = this.mailGenerator.mg.generate(mail);
    this.text = this.mailGenerator.mg.generatePlaintext(mail);
    return this;
  }
}
