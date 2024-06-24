import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import User from '../entities/user.entity';
import { UserType } from 'src/core/utils/enums/userType';
import Profile from 'src/profiles/entities/profile.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    if (process.env.NODE_ENV !== 'prod') {
      const manager = dataSource.manager;
      await manager.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;`);
      const profileRepo = dataSource.getRepository(Profile);

      const userFactory = factoryManager.get(User);

      const user = await userFactory.save({ userType: UserType.ADMIN });
      await profileRepo.save({ user });
      const users = await userFactory.saveMany(5);
      for (const user of users) {
        await profileRepo.save({ user });
      }
    }
  }
}
