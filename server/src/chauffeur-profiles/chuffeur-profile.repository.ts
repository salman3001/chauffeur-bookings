import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChauffeurProfile } from './entities/chauffeur-profile.entity';
import { BaseRepository } from 'src/cars/entities/base.repository';
import { ConfigService } from '@salman3001/nest-config-module';

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
