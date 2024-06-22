import { Injectable } from '@nestjs/common';
import { ConfigService } from '@salman3001/nest-config-module';
import Mailgen from 'mailgen';
import { Config } from 'src/core/config/config';

@Injectable()
export class MailGenerator {
  mg: Mailgen;
  constructor(private config: ConfigService) {
    this.mg = new Mailgen({
      product: {
        name: this.config.get<Config>().envs().APP_NAME,
        link: this.config.get<Config>().envs().APP_URL,
        copyright: `Copyright © ${new Date(Date.now()).getFullYear()} ${config.get<Config>().envs().APP_NAME}. All rights reserved.`,
      },
      theme: 'default',
    });
  }
}
