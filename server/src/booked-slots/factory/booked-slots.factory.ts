import { Factory } from 'rosie';
import { setSeederFactory } from 'typeorm-extension';
import { BookedSlot } from '../entities/booked-slot.entity';
import { faker } from '@faker-js/faker';

const factory = new Factory<BookedSlot>();

const dateTimeFrom = faker.date.past({ years: 1 });
const dateTimeTo = new Date(dateTimeFrom);
dateTimeTo.setHours(dateTimeTo.getHours() + 1);

export const bookedSlotFactory = factory
  .attr('dateTimeFrom', () => {
    dateTimeFrom.setHours(dateTimeFrom.getHours() + 1);
    return dateTimeFrom;
  })
  .attr('dateTimeTo', () => {
    dateTimeTo.setHours(dateTimeTo.getHours() + 1);
    return dateTimeTo;
  });

export default setSeederFactory(BookedSlot, () => {
  return bookedSlotFactory.build();
});
