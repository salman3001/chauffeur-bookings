import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/db/base.repository';
import { ConfigService } from '@nestjs/config';
import { Availability } from './entities/availability.entity';

@Injectable()
export class AvailabilityRepository extends BaseRepository<Availability> {
  constructor(
    @InjectRepository(Availability)
    repository: Repository<Availability>,
    config: ConfigService,
  ) {
    super(repository, config);
  }
}
