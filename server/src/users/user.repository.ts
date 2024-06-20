import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import User from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@salman3001/nest-config-module';
import { UserType } from 'src/core/utils/enums/userType';
import {
  BaseQueryFilter,
  BaseRepository,
} from 'src/cars/entities/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    config: ConfigService,
  ) {
    super(repository, config);
  }

  getChuffuers(query?: UserFilterQuery) {
    const qb = this.createQueryBuilder();
    qb.where('users.userType = :userType', { userType: UserType.CHAUFFEUR });
    this.applySearch(qb, query);

    return this.paginate(qb, query);
  }

  applySearch(qb: SelectQueryBuilder<User>, query?: UserFilterQuery) {
    qb.andWhere(
      new Brackets((qb) => {
        qb.where('users.firstName ILIKE :search', {
          search: `%${query?.search}%`,
        });
        qb.orWhere('users.lastName ILIKE :search', {
          search: `%${query?.search}%`,
        });
      }),
    );
  }
}

export interface UserFilterQuery extends BaseQueryFilter {
  search?: string;
}
