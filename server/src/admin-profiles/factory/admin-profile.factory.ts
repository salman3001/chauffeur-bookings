import { Factory } from 'rosie';
import { setSeederFactory } from 'typeorm-extension';
import { AdminProfile } from '../entities/admin-profile.entity';

const factory = new Factory<AdminProfile>();

export const adminProfileFactory = factory;

export default setSeederFactory(AdminProfile, () => {
  return adminProfileFactory.build();
});
