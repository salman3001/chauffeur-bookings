import { Booking } from 'src/bookings/entities/booking.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class BookedSlot {
  @Column('date')
  date: Date;

  @Column()
  time: string;

  @Column()
  slotName: string;

  @OneToOne(() => Booking, (booking) => booking.bookedSlot)
  @JoinColumn()
  booking: Booking;

  @ManyToOne(
    () => ChauffeurProfile,
    (chauffeurProfile) => chauffeurProfile.bookedSlots,
  )
  chauffeurProfile: ChauffeurProfile;
}
