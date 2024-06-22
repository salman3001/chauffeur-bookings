import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import Profile from 'src/profiles/entities/profile.entity';
import { UserRepository } from 'src/users/user.repository';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { MailsModule } from 'src/mails/mails.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), MailsModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, ProfileRepository],
})
export class AuthModule {}
