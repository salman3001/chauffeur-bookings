import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserType } from '../../core/utils/enums/userType';
import { hashSync } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import Profile from 'src/profiles/entities/profile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profiile.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Length(2, 50)
  firstName: string;

  @Column({ length: 50 })
  @Length(2, 50)
  lastName: string;

  @Column({ length: 50, unique: true })
  @IsEmail()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ length: 256 })
  @IsStrongPassword()
  password: string;

  @Column({ length: 15, nullable: true })
  @IsPhoneNumber('IN')
  phone?: string;

  @Column('enum', { enum: UserType })
  @IsEnum(UserType)
  userType: UserType;

  @Column('boolean', { default: false })
  @IsBoolean()
  isActive: boolean;

  @Column('boolean', { default: false })
  @IsBoolean()
  emailVerfied: boolean;

  @CreateDateColumn()
  cretaedAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    onDelete: 'CASCADE',
  })
  profile: Profile;

  @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user, {
    onDelete: 'CASCADE',
  })
  adminProfile: AdminProfile;

  @OneToOne(() => ChauffeurProfile, (profile) => profile.user, {
    onDelete: 'CASCADE',
  })
  chauffeurProfile: ChauffeurProfile;

  toJSON() {
    return instanceToPlain(this);
  }

  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      const hash = hashSync(this.password, 10);
      this.password = hash;
    }
  }
}
