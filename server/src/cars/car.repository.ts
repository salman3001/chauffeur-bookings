import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { BaseQueryFilter, BaseRepository } from 'src/db/base.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CarRepository extends BaseRepository<Car> {
  constructor(
    @InjectRepository(Car) repository: Repository<Car>,
    config: ConfigService,
  ) {
    super(repository, config);
  }

  applyFilers(qb: SelectQueryBuilder<Car>, query?: CarFilterQuery) {
    if (query?.search) {
      qb.andWhere('Car.name LIKE :search', {
        search: `%${query?.search}%`,
      });
    }
  }
}

export interface CarFilterQuery extends BaseQueryFilter {
  search?: string;
}
