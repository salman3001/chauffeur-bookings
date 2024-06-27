import { Factory } from 'rosie';
import { setSeederFactory } from 'typeorm-extension';
import { BookedSlot } from '../entities/booked-slot.entity';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

const factory = new Factory<BookedSlot>();

let dateTimeFrom = DateTime.fromJSDate(faker.date.past({ years: 1 }));
let dateTimeTo = dateTimeFrom.plus({ hour: 1 });

export const bookedSlotFactory = factory
  .attr('dateTimeFrom', () => {
    dateTimeFrom = dateTimeFrom.plus({ hour: 1 });
    return dateTimeFrom.toJSDate();
  })
  .attr('dateTimeTo', () => {
    dateTimeTo = dateTimeTo.plus({ hour: 1 });
    return dateTimeTo.toJSDate();
  });

export default setSeederFactory(BookedSlot, () => {
  return bookedSlotFactory.build();
});
