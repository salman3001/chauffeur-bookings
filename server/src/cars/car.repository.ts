import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@salman3001/nest-config-module';
import { Car } from './entities/car.entity';
import { BaseQueryFilter, BaseRepository } from './entities/base.repository';

@Injectable()
export class CarRepository extends BaseRepository<Car> {
  constructor(
    @InjectRepository(Car) repository: Repository<Car>,
    config: ConfigService,
  ) {
    super(repository, config);
  }

  applySearch(qb: SelectQueryBuilder<Car>, query?: CarFilterQuery) {
    qb.andWhere('cars.name ILIKE :search', {
      search: `%${query?.search}%`,
    });
  }
}

export interface CarFilterQuery extends BaseQueryFilter {
  search?: string;
}
