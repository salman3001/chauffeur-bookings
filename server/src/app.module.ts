import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ChauffeurProfilesModule } from './chauffeur-profiles/chauffeur-profiles.module';
import { CarsModule } from './cars/cars.module';
import { BookingsModule } from './bookings/bookings.module';
import { AdminProfilesModule } from './admin-profiles/admin-profiles.module';
import { PaymentsModule } from './payments/payments.module';
import { RefundsModule } from './refunds/refunds.module';
import { BookedSlotsModule } from './booked-slots/booked-slots.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MailsModule } from './mails/mails.module';
import { AuthMiddleware } from './utils/middlewares/auth/auth.middleware';
import { ConfigModule } from './config/config.module';
import { FilesModule } from './files/files.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    ChauffeurProfilesModule,
    CarsModule,
    BookingsModule,
    AdminProfilesModule,
    PaymentsModule,
    RefundsModule,
    BookedSlotsModule,
    NotificationsModule,
    MailsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
