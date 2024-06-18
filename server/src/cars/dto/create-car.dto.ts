import { PickType } from '@nestjs/mapped-types';
import { Car } from '../entities/car.entity';

export class CreateCarDto extends PickType(Car, ['name', 'make', 'year']) {}
