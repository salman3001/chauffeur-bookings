import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@salman3001/nest-config-module';
import { Config } from 'src/core/config/config';
import User from '../../users/entities/user.entity';
import Profile from '../../profiles/entities/profile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { Car } from 'src/cars/entities/car.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { AdminProfile } from 'src/admin-profiiles/entities/admin-profiile.entity';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';

export default function registerTypeOrm() {
  return TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<Config>().envs().PG_HOST,
      port: configService.get<Config>().envs().PG_PORT as unknown as number,
      username: configService.get<Config>().envs().PG_USERNAME,
      password: configService.get<Config>().envs().PG_PASSWORD,
      database: configService.get<Config>().envs().PG_DB,
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
      ],
      synchronize: true,
    }),
  });
}
