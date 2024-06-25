import { setSeederFactory } from 'typeorm-extension';
import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';
import { Car } from '../entities/car.entity';

const factory = new Factory<Car>();

export const carFactory = factory
  .attr('name', () => faker.vehicle.vehicle())
  .attr('make', () => faker.vehicle.vehicle())
  .attr('year', () => faker.date.past().getFullYear());

export default setSeederFactory(Car, () => {
  const car = carFactory.build();
  return car;
});
