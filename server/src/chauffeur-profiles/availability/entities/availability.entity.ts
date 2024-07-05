import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, ValidateIf } from 'class-validator';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { IsTimeString } from 'src/utils/validators/IsTimeString';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  sunday: boolean;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  sundayFullDay: boolean;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.sunday === true && o.sundayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  sundayFrom: string | null;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.sunday === true && o.sundayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  sundayTo: string | null;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  monday: boolean;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  mondayFullDay: boolean;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.monday === true && o.mondayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  mondayFrom: string | null;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.monday === true && o.mondayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  mondayTo: string | null;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  tuesday: boolean;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  tuesdayFullDay: boolean;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.tuesday === true && o.tuesdayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  tuesdayFrom: string | null;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.tuesday === true && o.tuesdayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  tuesdayTo: string | null;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  wednesday: boolean;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  wednesdayFullDay: boolean;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.wednesday === true && o.wednesdayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  wednesdayFrom: string | null;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.wednesday === true && o.wednesdayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  wednesdayTo: string | null;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  thursday: boolean;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  thursdayFullDay: boolean;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.thursday === true && o.thursdayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  thursdayFrom: string | null;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.thursday === true && o.thursdayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  thursdayTo: string | null;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  friday: boolean;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  fridayFullDay: boolean;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.friday === true && o.fridayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  fridayFrom: string | null;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.friday === true && o.fridayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  fridayTo: string | null;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  saturday: boolean;

  @Column('boolean')
  @ApiProperty()
  @IsBoolean()
  saturdayFullDay: boolean;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.saturday === true && o.saturdayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  saturdayFrom: string | null;

  @Column('time', { nullable: true })
  @ApiProperty({ type: String })
  @ValidateIf((o) => {
    if (o.saturday === true && o.saturdayFullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  saturdayTo: string | null;

  @OneToOne(
    () => ChauffeurProfile,
    (chauffeurProfile) => chauffeurProfile.availability,
  )
  @JoinColumn()
  chauffeurProfile: ChauffeurProfile;
}
