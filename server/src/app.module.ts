import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ChauffeurProfilesModule } from './chauffeur-profiles/chauffeur-profiles.module';
import { CarsModule } from './cars/cars.module';
import { BookingsModule } from './bookings/bookings.module';
import { AdminProfilesModule } from './admin-profiiles/admin-profiiles.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
