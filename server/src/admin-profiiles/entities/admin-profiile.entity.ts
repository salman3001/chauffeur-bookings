import { Booking } from 'src/bookings/entities/booking.entity';
import { Car } from 'src/cars/entities/car.entity';
import User from 'src/users/entities/user.entity';
import {
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class AdminProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Booking, (booking) => booking.adminProfile, {
    onDelete: 'SET NULL',
  })
  bookings: Booking[];

  @OneToMany(() => Car, (car) => car.adminProfile, { onDelete: 'CASCADE' })
  cars: Car[];

  @OneToOne(() => User, (user) => user.adminProfile)
  @JoinColumn()
  user: User;
}
