import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChauffeurProfile } from './entities/chauffeur-profile.entity';
import { BaseRepository } from 'src/db/base.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChauffeurProfileRepository extends BaseRepository<ChauffeurProfile> {
  constructor(
    @InjectRepository(ChauffeurProfile)
    repository: Repository<ChauffeurProfile>,
    config: ConfigService,
  ) {
    super(repository, config);
  }
}
