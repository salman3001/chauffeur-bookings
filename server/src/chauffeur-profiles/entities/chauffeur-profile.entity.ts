import { Booking } from 'src/bookings/entities/booking.entity';
import { Car } from 'src/cars/entities/car.entity';
import User from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChauffeurProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Booking, (booking) => booking.chauffeurProfile, {
    onDelete: 'SET NULL',
  })
  bookings: Booking[];

  @OneToOne(() => Car, (car) => car.chauffeurProfile)
  @JoinColumn()
  car: Car;

  @OneToOne(() => User, (user) => user.chauffeurProfile)
  @JoinColumn()
  user: User;
}
