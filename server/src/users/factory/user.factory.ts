import { setSeederFactory } from 'typeorm-extension';
import User from '../entities/user.entity';
import { UserType } from 'src/utils/enums/userType';
import { hashSync } from 'bcrypt';
import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

const factory = new Factory<User>();

export const userFactory = factory
  .attr('firstName', () => faker.person.firstName())
  .attr('lastName', () => faker.person.lastName())
  .attr('email', () => faker.internet.email())
  .attr('password', () => hashSync('123456789', 10))
  .attr('isActive', () => true)
  .attr('userType', () => UserType.CUSTOMER)
  .attr('emailVerified', () => true);

export default setSeederFactory(User, () => {
  const user = userFactory.build();
  return user;
});
