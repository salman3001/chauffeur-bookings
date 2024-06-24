import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import User from '../../users/entities/user.entity';
import { UserType } from 'src/utils/enums/userType';
import Profile from 'src/profiles/entities/profile.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    if (process.env.NODE_ENV !== 'prod') {
      const manager = dataSource.manager;
      await manager.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;`);
      const profileRepo = dataSource.getRepository(Profile);
      const adminProfileRepo = dataSource.getRepository(AdminProfile);
      const chauffeurProfileRepo = dataSource.getRepository(ChauffeurProfile);
      const BookedSlotRepo = dataSource.getRepository(BookedSlot);

      const userFactory = factoryManager.get(User);

      //admin
      const user = await userFactory.save({
        email: 'admin@gmail.com',
        userType: UserType.ADMIN,
      });

      await profileRepo.save({ user });
      await adminProfileRepo.save({ user });

      //chauffeur
      const chauffeur = await userFactory.save({
        email: 'chauffeur@gmail.com',
        userType: UserType.ADMIN,
      });

      await profileRepo.save({ user: chauffeur });
      await chauffeurProfileRepo.save({ user: chauffeur });

      const users = await userFactory.saveMany(5);

      for (const user of users) {
        await profileRepo.save({ user });
      }
    }
  }
}
