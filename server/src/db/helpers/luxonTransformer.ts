import { ValueTransformer } from 'typeorm';
import { DateTime } from 'luxon';

export const luxonTransformer: ValueTransformer = {
  to(value: DateTime): string {
    return value.toSQL()!;
  },
  from(value: string): object {
    return DateTime.fromSQL(value);
  },
};
