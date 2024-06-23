import { ConfigService } from '@nestjs/config';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { AppConfig } from '../config/app.config';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly config: ConfigService,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async paginate(qb: SelectQueryBuilder<T>, query?: BaseQueryFilter) {
    const take =
      query?.perPage || this.config.get<AppConfig>('appConfig')!.defaultPerPage;
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

    const results = await qb.getMany();
    const count = await qb.getCount();

    return { results, count, perPage: take };
  }
}

export interface BaseQueryFilter {
  page?: number;
  perPage?: number;
  orderBy?: string;
}
