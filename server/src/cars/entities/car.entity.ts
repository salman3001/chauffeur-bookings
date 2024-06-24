import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Length, Min } from 'class-validator';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import Image from 'src/utils/enities/Image.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  @Length(2, 50)
  name: string;

  @Column()
  @ApiProperty()
  @Length(2, 50)
  make: string;

  @Column()
  @ApiProperty()
  @IsNumber()
  @Min(1950)
  year: number;

  @Column('jsonb', { nullable: true })
  image?: Image;

  @ManyToOne(() => AdminProfile, (adminProfile) => adminProfile.cars)
  owner: AdminProfile;

  @OneToOne(
    () => ChauffeurProfile,
    (chauffeurProfile) => chauffeurProfile.car,
    {
      onDelete: 'SET NULL',
    },
  )
  chauffeurProfile: ChauffeurProfile;
}
