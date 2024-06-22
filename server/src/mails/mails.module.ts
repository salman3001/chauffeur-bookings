import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailGenerator } from './mailgenerator';
import { BookingCreatedEmail } from './mails/booking-created.email';
import { AccountCreatedEmail } from './mails/account-created.email';
import { ForgotPasswordEmail } from './mails/forgotPassword.email';

@Module({
  providers: [
    MailsService,
    MailGenerator,
    BookingCreatedEmail,
    ForgotPasswordEmail,
    AccountCreatedEmail,
  ],
  exports: [MailsService],
})
export class MailsModule {}
