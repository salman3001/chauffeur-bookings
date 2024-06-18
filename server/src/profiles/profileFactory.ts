import { Factory } from 'rosie';
import Profile from './entities/profile.entity';

const factory = new Factory<Profile>();

export const profileFactory = factory;
