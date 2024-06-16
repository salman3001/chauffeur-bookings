import { Factory } from 'rosie';

import Profile from 'src/users-app/entities/profile.entity';

const factory = new Factory<Profile>();

export const profileFactory = factory;
