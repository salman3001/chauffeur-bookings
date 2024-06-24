import { setSeederFactory } from 'typeorm-extension';
import User from '../entities/user.entity';
import { UserType } from 'src/core/utils/enums/userType';
import { hashSync } from 'bcrypt';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName('male');
  user.lastName = faker.person.lastName('male');
  user.email = faker.internet.email(user.firstName, user.lastName);
  user.password = hashSync('123456789', 2);
  user.phone = '919805893578';
  user.userType = UserType.CUSTOMER;
  user.isActive = true;
  user.emailVerfied = true;

  return user;
});
