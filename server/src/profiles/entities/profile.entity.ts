import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Image from '../../core/utils/enities/Image.entity';
import User from 'src/users/entities/user.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: true })
  avatar?: Image;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @OneToMany(() => Booking, (booking) => booking.chauffeurProfile, {
    onDelete: 'SET NULL',
  })
  bookings: Booking[];
}
