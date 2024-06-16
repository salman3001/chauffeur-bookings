import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@salman3001/nest-config-module';
import { Config } from 'src/core/config/config';
import User from '../entities/user.entity';
import Profile from '../entities/profile.entity';

export default function registerTypeOrm() {
  return TypeOrmModule.forRootAsync({
    name: 'usersApp',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<Config>().envs().PG_HOST,
      port: configService.get<Config>().envs().PG_PORT as unknown as number,
      username: configService.get<Config>().envs().PG_USERNAME,
      password: configService.get<Config>().envs().PG_PASSWORD,
      database: configService.get<Config>().envs().PG_DB,
      entities: [User, Profile],
      synchronize: true,
    }),
  });
}
