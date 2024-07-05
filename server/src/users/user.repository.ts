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
import { DateTime } from 'luxon';

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
    qb.where('User.userType = :userType', {
      userType: UserType.CHAUFFEUR,
    }).andWhere('User.isActive = true');
    this.applyFilters(qb, query);

    return this.paginate(qb, query);
  }

  checkChauffeurAvailabiltity(
    chauffeurId: number,
    dateTime: string,
    duration: number,
  ) {
    const requestedDateTimeForm = DateTime.fromISO(dateTime);
    const requestedDateTimeTo = DateTime.fromISO(dateTime).plus({
      hour: duration,
    });

    const requestedDay = requestedDateTimeForm.weekdayLong?.toLocaleLowerCase();

    const qb = this.createQueryBuilder();
    qb.leftJoinAndSelect('User.chauffeurProfile', 'chauffeurProfile');
    qb.innerJoin('chauffeurProfile.availability', 'availability');
    qb.leftJoin(
      'chauffeurProfile.bookedSlots',
      'bookedSlot',
      `("bookedSlot"."dateTimeFrom" BETWEEN :requestedFrom AND :requestedTo
       OR "bookedSlot"."dateTimeTo" BETWEEN :requestedFrom AND :requestedTo
       OR ("bookedSlot"."dateTimeFrom" <= :requestedFrom AND "bookedSlot"."dateTimeTo" >= :requestedTo))`,
      {
        requestedFrom: requestedDateTimeForm.toJSDate(),
        requestedTo: requestedDateTimeTo.toJSDate(),
      },
    );
    qb.where('User.id = :id', { id: chauffeurId });
    qb.andWhere('User.isActive = true');
    qb.andWhere('User.userType = :userType', {
      userType: UserType.CHAUFFEUR,
    });
    qb.andWhere(`availability.${requestedDay} = true`);
    qb.andWhere(
      `(
        availability."${requestedDay}FullDay" = true
        OR (availability."${requestedDay}From" <= :timeFrom AND availability."${requestedDay}To" >= :timeTo)
      )`,
      {
        timeFrom: requestedDateTimeForm.toFormat('HH:mm:ss'),
        timeTo: requestedDateTimeTo.toFormat('HH:mm:ss'),
      },
    );
    return qb.getOne();
  }

  getAvailableChauffeurs(dateTime: string, duration: number) {
    const requestedDateTimeForm = DateTime.fromISO(dateTime);
    const requestedDateTimeTo = DateTime.fromISO(dateTime).plus({
      hour: duration,
    });

    const requestedDay = requestedDateTimeForm.weekdayLong?.toLocaleLowerCase();

    const qb = this.createQueryBuilder();
    qb.leftJoinAndSelect('User.chauffeurProfile', 'chauffeurProfile');
    qb.innerJoin('chauffeurProfile.availability', 'availability');
    qb.leftJoin(
      'chauffeurProfile.bookedSlots',
      'bookedSlot',
      `("bookedSlot"."dateTimeFrom" BETWEEN :requestedFrom AND :requestedTo
       OR "bookedSlot"."dateTimeTo" BETWEEN :requestedFrom AND :requestedTo
       OR ("bookedSlot"."dateTimeFrom" <= :requestedFrom AND "bookedSlot"."dateTimeTo" >= :requestedTo))`,
      {
        requestedFrom: requestedDateTimeForm.toJSDate(),
        requestedTo: requestedDateTimeTo.toJSDate(),
      },
    );
    qb.where('User.isActive = true');
    qb.andWhere('User.userType = :userType', {
      userType: UserType.CHAUFFEUR,
    });
    qb.andWhere(`availability.${requestedDay} = true`);
    qb.andWhere(
      `(
        availability."${requestedDay}FullDay" = true
        OR (availability."${requestedDay}From" <= :timeFrom AND availability."${requestedDay}To" >= :timeTo)
      )`,
      {
        timeFrom: requestedDateTimeForm.toFormat('HH:mm:ss'),
        timeTo: requestedDateTimeTo.toFormat('HH:mm:ss'),
      },
    );

    return qb.getMany();
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
