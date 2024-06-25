import { Booking } from 'src/bookings/entities/booking.entity';
import { Car } from 'src/cars/entities/car.entity';
import User from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Availability, defaultAvailability } from '../fixtures/availability';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';

@Entity()
export class ChauffeurProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerHour: string;

  @Column('jsonb', { default: defaultAvailability })
  availability: Availability;

  @OneToMany(() => Booking, (booking) => booking.chauffeurProfile, {
    onDelete: 'SET NULL',
  })
  bookings: Booking[];

  @OneToOne(() => Car, (car) => car.chauffeurProfile, { nullable: true })
  @JoinColumn()
  car: Car;

  @OneToOne(() => User, (user) => user.chauffeurProfile)
  @JoinColumn()
  user: User;

  @OneToMany(() => BookedSlot, (bookedSlot) => bookedSlot.chauffeurProfile)
  bookedSlots: BookedSlot[];
}
