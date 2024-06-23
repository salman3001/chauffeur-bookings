import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Profile from './entities/profile.entity';
import { BaseRepository } from 'src/core/db/base.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor(
    @InjectRepository(Profile)
    repository: Repository<Profile>,
    config: ConfigService,
  ) {
    super(repository, config);
  }
}
