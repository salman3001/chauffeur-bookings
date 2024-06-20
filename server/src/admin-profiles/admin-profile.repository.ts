import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminProfile } from './entities/admin-profile.entity';
import { BaseRepository } from 'src/cars/entities/base.repository';
import { ConfigService } from '@salman3001/nest-config-module';

@Injectable()
export class AdminProfileRepository extends BaseRepository<AdminProfile> {
  constructor(
    @InjectRepository(AdminProfile) repository: Repository<AdminProfile>,
    config: ConfigService,
  ) {
    super(repository, config);
  }
}
