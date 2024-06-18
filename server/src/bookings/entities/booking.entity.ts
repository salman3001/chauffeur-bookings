import { AdminProfile } from 'src/admin-profiiles/entities/admin-profiile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import Profile from 'src/profiles/entities/profile.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.bookings)
  profile: Profile;

  @ManyToOne(() => AdminProfile, (adminProfile) => adminProfile.bookings)
  adminProfile: AdminProfile;

  @ManyToOne(
    () => ChauffeurProfile,
    (chauffeurProfile) => chauffeurProfile.bookings,
  )
  chauffeurProfile: ChauffeurProfile;
}
