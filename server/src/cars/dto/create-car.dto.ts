import { PickType } from '@nestjs/swagger';
import { Car } from '../entities/car.entity';

export class CreateCarDto extends PickType(Car, [
  'name',
  'make',
  'year',
] as const) {}
