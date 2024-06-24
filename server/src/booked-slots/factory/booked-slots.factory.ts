import { Factory } from 'rosie';
import { setSeederFactory } from 'typeorm-extension';
import { BookedSlot } from '../entities/booked-slot.entity';
import { faker } from '@faker-js/faker';

const factory = new Factory<BookedSlot>();

let date = new Date();

export const bookedSlotFactory = factory
  .attr('dateTimeFrom', () => {
    date = faker.date.past();
    return date;
  })
  .attr('dateTimeTo', () => {
    date.setHours(date.getHours() + 3);
    return date;
  });

export default setSeederFactory(BookedSlot, () => {
  return bookedSlotFactory.build();
});
