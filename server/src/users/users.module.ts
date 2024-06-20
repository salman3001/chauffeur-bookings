import { Module } from '@nestjs/common';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { userPolicy } from './user.policy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UserRepository } from './user.repository';
import Profile from 'src/profiles/entities/profile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { AdminProfileRepository } from 'src/admin-profiles/admin-profile.repository';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';
import { BookedSlotRepository } from 'src/booked-slots/booked-slot.repository';

@Module({
  imports: [
    PolicyModule.register([{ token: 'userPolicy', policy: userPolicy }]),
    TypeOrmModule.forFeature([
      User,
      Profile,
      ChauffeurProfile,
      AdminProfile,
      BookedSlot,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    ChauffeurProfile,
    ProfileRepository,
    AdminProfileRepository,
    BookedSlotRepository,
  ],
})
export class UsersModule {}
