import { ConfigService } from '@nestjs/config';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { AppConfig } from '../config/app.config';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly config: ConfigService,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async paginate(qb: SelectQueryBuilder<T>, query?: BaseQueryFilter) {
    let take = this.config.get<AppConfig>('appConfig')!.defaultPerPage;
    if (query?.perPage) {
      take = query.perPage;
    }

    const skip = ((query?.page || 1) - 1) * take;

    if (skip) {
      qb.skip(skip);
    }

    if (take) {
      qb.take(take);
    }

    const results = await qb.getMany();
    const count = await qb.getCount();

    return { results, count, perPage: take };
  }

  orderBy(qb: SelectQueryBuilder<T>, alias: string, query?: BaseQueryFilter) {
    if (query?.orderBy && query?.orderBy?.length > 0) {
      query?.orderBy?.forEach((order: string) => {
        const [orderBy, orderDirection] = order.split(':');
        qb.orderBy(`${alias}.${orderBy}`, orderDirection as 'DESC');
      });
    }
  }
}

export class BaseQueryFilter {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  @Type(() => String)
  orderBy?: string[];
}
