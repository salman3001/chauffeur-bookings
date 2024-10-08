import { ValueTransformer } from 'typeorm';

export const jsonTransformer: ValueTransformer = {
  to(value: object): string {
    return JSON.stringify(value);
  },
  from(value: string): object {
    return JSON.parse(value);
  },
};
