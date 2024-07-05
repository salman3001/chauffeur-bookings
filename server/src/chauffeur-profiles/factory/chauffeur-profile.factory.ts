import { setSeederFactory } from 'typeorm-extension';
import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';
import { ChauffeurProfile } from '../entities/chauffeur-profile.entity';

const factory = new Factory<ChauffeurProfile>();

const getDayAvalability = (day: string) =>
  ({
    [day]: faker.datatype.boolean({ probability: 0.8 }),
    [`${day}FullDay`]: faker.datatype.boolean({ probability: 0.5 }),
    [`${day}From`]: '08:00',
    [`${day}To`]: '10:00',
  }) as any;

export const chauffeurProfileFactory = factory
  .attr('pricePerHour', () => faker.commerce.price())
  .attr('availability', () => ({
    ...getDayAvalability('monday'),
    ...getDayAvalability('tuesday'),
    ...getDayAvalability('wednesday'),
    ...getDayAvalability('thursday'),
    ...getDayAvalability('friday'),
    ...getDayAvalability('saturday'),
    ...getDayAvalability('sunday'),
  }));

export default setSeederFactory(ChauffeurProfile, () => {
  const chauffeurProfile = chauffeurProfileFactory.build();
  return chauffeurProfile;
});
