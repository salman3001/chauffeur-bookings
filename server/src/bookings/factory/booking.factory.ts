import { Factory } from 'rosie';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Booking } from '../entities/booking.entity';
import { BookingStatus } from 'src/utils/enums/BookingStatus';
import { DateTime } from 'luxon';

const factory = new Factory<Booking>();

export const bookingFactory = factory
  .attr('pickupAddress', () => faker.location.streetAddress())
  .attr('pickupCords', () => {
    const [x, y] = faker.location.nearbyGPSCoordinate({
      origin: [28.61, 77.2],
    });
    return {
      x: x.toString(),
      y: y.toString(),
    };
  })
  .attr('dropoffAddress', () => faker.location.streetAddress())
  .attr('dropoffCords', () => {
    const [x, y] = faker.location.nearbyGPSCoordinate({
      origin: [28.61, 77.2],
    });
    return {
      x: x.toString(),
      y: y.toString(),
    };
  })
  .attr('pricePerHour', () => faker.commerce.price())
  .attr('status', () => BookingStatus.BOOKED)
  .attr('bookedForHours', () => 2)
  .attr('total', () => (2 * Number(faker.commerce.price())).toString())
  .attr('history', () => [
    {
      dateTime: DateTime.local().toISO(),
      event: 'Booking Created',
      detail: 'Booking Created',
    },
  ]);

export default setSeederFactory(Booking, () => {
  return bookingFactory.build();
});
