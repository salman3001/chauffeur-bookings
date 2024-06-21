import { Booking } from 'src/bookings/entities/booking.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BookedSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dateTimeFrom: Date;

  @Column()
  dateTimeTo: Date;

  @OneToOne(() => Booking, (booking) => booking.bookedSlot)
  @JoinColumn()
  booking: Booking;

  @ManyToOne(
    () => ChauffeurProfile,
    (chauffeurProfile) => chauffeurProfile.bookedSlots,
  )
  chauffeurProfile: ChauffeurProfile;
}
