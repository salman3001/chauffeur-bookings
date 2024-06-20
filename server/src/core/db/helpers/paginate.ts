import { ConfigService } from '@salman3001/nest-config-module';
import { Config } from 'src/core/config/config';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

async function paginate<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  config: ConfigService,
  query?: PaginateFiler,
) {
  const take = query?.perPage || config.get<Config>().defaultPerPage;
  const skip = ((query?.page || 1) - 1) * take;

  const [orderBy, orderDirection] = query?.orderBy
    ? query?.orderBy.split(':')
    : [];

  if (orderBy) {
    qb.orderBy(orderBy, orderDirection as 'ASC');
  }

  if (skip) {
    qb.skip(skip);
  }

  if (take) {
    qb.take(take);
  }

  const cars = await qb.getMany();
  const count = await qb.getCount();

  return { cars, count, perPage: take };
}

export interface PaginateFiler {
  page?: number;
  perPage?: number;
  orderBy?: string;
}
