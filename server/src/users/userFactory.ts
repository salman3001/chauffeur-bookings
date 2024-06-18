import { hashSync } from 'bcrypt';
import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';
import User from './entities/user.entity';

const factory = new Factory<User>();

export const userFactory = factory
  .attr('firstName', () => faker.person.firstName())
  .attr('lastName', () => faker.person.lastName())
  .attr('email', () => faker.internet.email())
  .attr('isActive', () => true)
  .attr('password', () => hashSync('123456789', 10));
