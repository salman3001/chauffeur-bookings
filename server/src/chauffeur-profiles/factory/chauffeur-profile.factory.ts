import { setSeederFactory } from 'typeorm-extension';
import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';
import { ChauffeurProfile } from '../entities/chauffeur-profile.entity';

const factory = new Factory<ChauffeurProfile>();

const getDayAvalability = () => ({
  available: faker.datatype.boolean({ probability: 0.8 }),
  fullDay: faker.datatype.boolean({ probability: 0.5 }),
  from: '08:00',
  to: '10:00',
});

export const chauffeurProfileFactory = factory
  .attr('pricePerHour', () => faker.commerce.price())
  .attr('availability', () => ({
    sunday: getDayAvalability(),
    monday: getDayAvalability(),
    tuesday: getDayAvalability(),
    wednesday: getDayAvalability(),
    thursday: getDayAvalability(),
    friday: getDayAvalability(),
    saturday: getDayAvalability(),
  }));

export default setSeederFactory(ChauffeurProfile, () => {
  const chauffeurProfile = chauffeurProfileFactory.build();
  return chauffeurProfile;
});
