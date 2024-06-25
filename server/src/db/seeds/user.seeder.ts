import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import User from '../../users/entities/user.entity';
import { UserType } from 'src/utils/enums/userType';
import Profile from 'src/profiles/entities/profile.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';
import { chauffeurProfileFactory } from 'src/chauffeur-profiles/factory/chauffeur-profile.factory';
import { bookedSlotFactory } from 'src/booked-slots/factory/booked-slots.factory';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Car } from 'src/cars/entities/car.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    if (process.env.NODE_ENV !== 'prod') {
      const manager = dataSource.manager;
      await manager.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;`);

      // repos
      const profileRepo = dataSource.getRepository(Profile);
      const adminProfileRepo = dataSource.getRepository(AdminProfile);
      const chauffeurProfileRepo = dataSource.getRepository(ChauffeurProfile);
      const bookedSlotRepo = dataSource.getRepository(BookedSlot);

      //seed factories
      const userFactory = factoryManager.get(User);
      const bookingFactory = factoryManager.get(Booking);
      const carFactory = factoryManager.get(Car);

      //admin
      const user = await userFactory.save({
        email: 'admin@gmail.com',
        userType: UserType.ADMIN,
      });

      await profileRepo.save({ user });
      const adminProfile = await adminProfileRepo.save({ user });

      //chauffeur
      const chauffeur = await userFactory.save({
        email: 'chauffeur@gmail.com',
        userType: UserType.CHAUFFEUR,
      });

      await profileRepo.save({ user: chauffeur });
      const chauffeurProfile = await chauffeurProfileRepo.save({
        ...chauffeurProfileFactory.build(),
        user: chauffeur,
      });

      // customer

      const customer = await userFactory.save({
        email: 'customer@gmail.com',
        userType: UserType.CUSTOMER,
      });

      const customerProfile = await profileRepo.save({ user: customer });

      // bookings
      const bookings = await bookingFactory.saveMany(5, {
        customerProfile,
        chauffeurProfile,
      });

      // chauffeur booked slots
      for (const booking of bookings) {
        const bookedSlots = bookedSlotFactory.build({
          chauffeurProfile,
          booking,
        });
        await bookedSlotRepo.save(bookedSlots);
      }

      //other users

      const users = await userFactory.saveMany(5);
      for (const user of users) {
        await profileRepo.save({ user });
      }

      // cars
      await carFactory.save({
        owner: adminProfile,
        chauffeurProfile,
      });

      await carFactory.saveMany(5, {
        owner: adminProfile,
      });
    }
  }
}
