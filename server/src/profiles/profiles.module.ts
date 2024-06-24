import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { profilePolicy } from './pofilePolicy';
import { TypeOrmModule } from '@nestjs/typeorm';
import Profile from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    PolicyModule.register([{ token: 'profilePolicy', policy: profilePolicy }]),
    TypeOrmModule.forFeature([Profile]),
    FilesModule,
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileRepository],
})
export class ProfilesModule {}
