import { IsNumber } from 'class-validator';
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

@Entity()
export class ChauffeurProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  pricePerHour: string;

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
