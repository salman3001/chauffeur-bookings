import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@salman3001/nest-config-module';
import nodemailer, { Transporter } from 'nodemailer';
import { Config } from 'src/core/config/config';
import {
  BookingCreatedEmail,
  BookingCreatedEmailPayload,
} from './mails/booking-created.email';
import {
  ForgotPasswordEmail,
  ForgotPasswordEmailPayload,
} from './mails/forgotPassword.email';
import {
  AccountCreatedEmail,
  AccountCreatedEmailPayload,
} from './mails/account-created.email';

@Injectable()
export class MailsService implements OnModuleInit {
  transporter: Transporter;

  constructor(
    private config: ConfigService,
    private accountCreatedEmail: AccountCreatedEmail,
    private forgotPasswordEmail: ForgotPasswordEmail,
    private bookingCreatedEmail: BookingCreatedEmail,
  ) {}

  async sendAccountCreatedEmail(
    to: string,
    payload: AccountCreatedEmailPayload,
  ) {
    await this.transporter.sendMail(
      this.accountCreatedEmail.create(to, payload),
    );
  }

  async sendForgotPassqordEmail(
    to: string,
    payload: ForgotPasswordEmailPayload,
  ) {
    await this.transporter.sendMail(
      this.forgotPasswordEmail.create(to, payload),
    );
  }

  async sendBookingCreatedEmail(
    to: string,
    payload: BookingCreatedEmailPayload,
  ) {
    await this.transporter.sendMail(
      this.bookingCreatedEmail.create(to, payload),
    );
  }

  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<Config>().envs().SMTP_HOST,
      port: this.config.get<Config>().envs().SMTP_PORT,
      secure: false,
      auth: {
        user: this.config.get<Config>().envs().SMTP_USERNAME,
        pass: this.config.get<Config>().envs().SMTP_PASSWORD,
      },
    });
  }
}
