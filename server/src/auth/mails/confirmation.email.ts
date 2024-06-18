import { NestMail } from '@salman3001/nest-mailer';
import { Content } from 'mailgen';
import { mailGenerator } from 'src/core/utils/mailGenerator';

interface ConfirmationEmailPayload {
  name: string;
  link: string;
}

export class ConfirmationEmail implements NestMail {
  from: string = 'admin@gmail.com';
  subject: string = 'Welcome to chauffeur booking';
  text: string;
  html: string;

  setHtml(payload: ConfirmationEmailPayload): void {
    const mail: Content = {
      body: {
        name: payload.name,
        title: 'Welcome to chauffeur bookings',
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
    this.html = mailGenerator.generate(mail);
    this.text = mailGenerator.generatePlaintext(mail);
  }

  constructor(
    public to: string,
    payload: ConfirmationEmailPayload,
  ) {
    this.to = to;
    this.setHtml(payload);
  }
}
