import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
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

@Module({
  imports: [
    CoreModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
