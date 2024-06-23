import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import bullMqConfig from './config/bullMq.config';
import emailsConfig from './config/emails.config';
import redisConfig from './config/redis.config';
import smtpConfig from './config/smtp.config';
import typeormConfig, { TypeormConfig } from './config/typeorm.config';
import { configValidator } from './config/configValidator';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import Profile from 'src/profiles/entities/profile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { Car } from 'src/cars/entities/car.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [
        appConfig,
        bullMqConfig,
        emailsConfig,
        redisConfig,
        smtpConfig,
        typeormConfig,
      ],
      validate: configValidator,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeormConfig>('typeormConfig'),
        entities: [
          User,
          Profile,
          ChauffeurProfile,
          AdminProfile,
          Car,
          Booking,
          Payment,
          Refund,
          BookedSlot,
          Notification,
        ],
        autoLoadEntities: false,
        synchronize: true,
      }),
    }),
    BullModule.forRoot({
      connection: {},
    }),
    // BullModule.forRootAsync({
    //   useFactory: (config: ConfigService) => ({
    //     connection: {
    //       host: config.get<Config>().envs().REDIS_HOST,
    //       port: config.get<Config>().envs().REDIS_PORT,
    //       // username: config.get<Config>().envs().REDIS_USERNAME,
    //       // password: config.get<Config>().envs().REDIS_PASSWORD,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [],
})
export class CoreModule {}
