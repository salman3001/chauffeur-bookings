import { NestMail } from '@salman3001/nest-mailer';
import Mailgen, { Content } from 'mailgen';
import { mailGenerator } from 'src/core/utils/mailGenerator';
import { Booking } from '../entities/booking.entity';
import { Config } from 'src/core/config/config';

interface BookingCreatedEmailPayload {
  booking: Booking;
}

export class BookingCreatedEmail implements NestMail {
  config: Config;
  mailGen: Mailgen;
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;

  constructor(to: string, payload: BookingCreatedEmailPayload) {
    this.config = new Config();
    this.mailGen = mailGenerator(this.config);
    this.to = to;
    this.from = this.config.envs().EMAIL_FROM;
    this.subject = 'Your Booking has created';
    this.setHtml(payload);
  }

  setHtml(payload: BookingCreatedEmailPayload): void {
    const customerName = payload?.booking?.customerProfile?.user?.firstName;
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
    this.html = this.mailGen.generate(mail);
    this.text = this.mailGen.generatePlaintext(mail);
  }
}
