import {
  IsEnum,
  IsNumber,
  IsPositive,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { jsonTransformer } from 'src/core/db/helpers/jsonTransformer';
import BookingHistory from 'src/core/utils/enities/bookingHistory.entity';
import Geometry from 'src/core/utils/enities/geometry.entity';
import { BookingStatus } from 'src/core/utils/enums/BookingStatus';
import { PaymentMode } from 'src/core/utils/enums/PaymentMode';
import { Payment } from 'src/payments/entities/payment.entity';
import Profile from 'src/profiles/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(5, 256)
  pickupAddress: string;

  @Column('json', { transformer: jsonTransformer })
  @ValidateNested()
  pickupCords: Geometry;

  @Column()
  @Length(5, 256)
  dropoffAddress: string;

  @Column('json', { transformer: jsonTransformer })
  @ValidateNested()
  dropoffCords: Geometry;

  @Column()
  @IsNumber()
  @Min(1)
  bookedForHours: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  @IsPositive()
  pricePerHour: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  @IsPositive()
  total: string;

  @Column('enum', { enum: BookingStatus })
  @IsEnum(BookingStatus)
  status: BookingStatus;

  @Column('enum', { enum: PaymentMode })
  @IsEnum(PaymentMode)
  paymentMode: PaymentMode;

  @Column('json', { transformer: jsonTransformer })
  @ValidateNested()
  history: BookingHistory[];

  @OneToOne(() => Payment, (payment) => payment.booking)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => Profile, (profile) => profile.bookings)
  customerProfile: Profile;

  @ManyToOne(
    () => ChauffeurProfile,
    (chauffeurProfile) => chauffeurProfile.bookings,
  )
  chauffeurProfile: ChauffeurProfile;

  @OneToOne(() => BookedSlot, (bookedSlot) => bookedSlot.booking)
  bookedSlot: BookedSlot;
}
