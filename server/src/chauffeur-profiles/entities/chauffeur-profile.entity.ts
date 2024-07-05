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
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';
import { Availability } from '../availability/entities/availability.entity';

@Entity()
export class ChauffeurProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  pricePerHour: string;

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

  @OneToOne(
    () => Availability,
    (availability) => availability.chauffeurProfile,
    { nullable: true },
  )
  availability: Availability;
}
