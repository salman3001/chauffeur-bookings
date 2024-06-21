import Mailgen from 'mailgen';
import { Config } from '../config/config';

export const mailGenerator = (config: Config) => {
  return new Mailgen({
    product: {
      name: config.envs().APP_NAME,
      link: config.envs().APP_URL,
      copyright: `Copyright © ${new Date(Date.now()).getFullYear()} ${config.envs().APP_NAME}. All rights reserved.`,
    },
    theme: 'default',
  });
};
