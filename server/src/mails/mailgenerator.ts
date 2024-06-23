import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailgen from 'mailgen';
import { AppConfig } from 'src/core/config/app.config';

@Injectable()
export class MailGenerator {
  mg: Mailgen;
  constructor(private config: ConfigService) {
    this.mg = new Mailgen({
      product: {
        name: this.config.get<AppConfig>('appConfig')!.appName,
        link: this.config.get<AppConfig>('appConfig')!.appUrl,
        copyright: `Copyright © ${new Date(Date.now()).getFullYear()} ${this.config.get<AppConfig>('appConfig')?.appName}. All rights reserved.`,
      },
      theme: 'default',
    });
  }
}
