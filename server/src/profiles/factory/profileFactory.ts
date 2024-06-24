import { Factory } from 'rosie';
import Profile from '../entities/profile.entity';
import { setSeederFactory } from 'typeorm-extension';

const factory = new Factory<Profile>();

export const profileFactory = factory;

export default setSeederFactory(Profile, () => {
  return profileFactory.build();
});
