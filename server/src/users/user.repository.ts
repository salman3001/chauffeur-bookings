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

  getChuffeurs(query?: UserFilterQuery) {
    const qb = this.createQueryBuilder();
    qb.where('user.userType = :userType', { userType: UserType.CHAUFFEUR });
    this.applySearch(qb, query);

    return this.paginate(qb, query);
  }

  getActiveChuffeurs(query?: UserFilterQuery) {
    const qb = this.createQueryBuilder();
    qb.where('user.userType = :userType', {
      userType: UserType.CHAUFFEUR,
    }).andWhere('user.isActive = true');
    this.applySearch(qb, query);

    return this.paginate(qb, query);
  }

  getCustomer(query?: UserFilterQuery) {
    const qb = this.createQueryBuilder();
    qb.where('user.userType = :userType', { userType: UserType.CUSTOMER });
    this.applySearch(qb, query);

    return this.paginate(qb, query);
  }

  applySearch(qb: SelectQueryBuilder<User>, query?: UserFilterQuery) {
    if (query?.search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('user.firstName ILIKE :search', {
            search: `%${query?.search}%`,
          });
          qb.orWhere('user.lastName ILIKE :search', {
            search: `%${query?.search}%`,
          });
        }),
      );
    }

    if (query?.active) {
      qb.andWhere('user.isActive = true');
    }

    if (query?.userType) {
      qb.andWhere('user.userType = :userType', { userType: query.userType });
    }
  }
}

export interface UserFilterQuery extends BaseQueryFilter {
  search?: string;
  active?: boolean;
  userType?: UserType;
}
