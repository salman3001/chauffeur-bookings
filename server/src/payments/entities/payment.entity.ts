import { Booking } from 'src/bookings/entities/booking.entity';
import {
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  cretaedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Booking, (booking) => booking.payment)
  booking: Booking;
}
