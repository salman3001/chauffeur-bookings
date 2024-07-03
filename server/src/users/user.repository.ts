import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import User from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from 'src/utils/enums/userType';
import { BaseQueryFilter, BaseRepository } from 'src/db/base.repository';
import { ConfigService } from '@nestjs/config';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
    qb.where('User."userType" = :userType', { userType: UserType.CHAUFFEUR });

    this.applyFilters(qb, query);
    return this.paginate(qb, query);
  }

  getActiveChuffeurs(query?: UserFilterQuery) {
    const qb = this.createQueryBuilder();
    qb.where('User."userType" = :userType', {
      userType: UserType.CHAUFFEUR,
    }).andWhere('User."isActive" = true');
    this.applyFilters(qb, query);

    return this.paginate(qb, query);
  }

  getCustomer(query?: UserFilterQuery) {
    const qb = this.createQueryBuilder();
    qb.where('User."userType" = :userType', { userType: UserType.CUSTOMER });
    this.applyFilters(qb, query);

    return this.paginate(qb, query);
  }

  applyFilters(qb: SelectQueryBuilder<User>, query?: UserFilterQuery) {
    if (query?.search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('User.firstName ILIKE :search', {
            search: `%${query?.search}%`,
          });
          qb.orWhere('User.lastName ILIKE :search', {
            search: `%${query?.search}%`,
          });
        }),
      );
    }

    if (query?.active) {
      qb.andWhere('User."isActive" = :active', { active: query.active });
    }

    if (query?.userType) {
      qb.andWhere('User."userType" = :userType', { userType: query.userType });
    }
  }
}

export class UserFilterQuery extends BaseQueryFilter {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean;

  @ApiPropertyOptional({ enum: UserType })
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;
}
