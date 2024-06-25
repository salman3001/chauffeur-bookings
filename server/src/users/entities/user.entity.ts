import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate,
} from 'typeorm';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserType } from '../../utils/enums/userType';
import { getRounds, hashSync } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import Profile from 'src/profiles/entities/profile.entity';
import { ChauffeurProfile } from 'src/chauffeur-profiles/entities/chauffeur-profile.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'src/utils/validators/Trim';
import { ToLowercase } from 'src/utils/validators/ToLowercase';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @ApiProperty()
  @Length(2, 50)
  firstName: string;

  @Column({ length: 50 })
  @ApiProperty()
  @Length(2, 50)
  lastName: string;

  @Column({ length: 50, unique: true })
  @ApiProperty()
  @IsEmail()
  @Trim()
  @ToLowercase()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ length: 256 })
  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @Column({ length: 15, nullable: true })
  @ApiProperty()
  @IsPhoneNumber('IN')
  phone?: string;

  @Column('enum', { enum: UserType })
  @ApiProperty()
  @IsEnum(UserType)
  userType: UserType;

  @Column('boolean', { default: false })
  @ApiProperty({ default: false })
  @IsBoolean()
  isActive: boolean;

  @Column('boolean', { default: false })
  @IsBoolean()
  emailVerfied: boolean;

  @CreateDateColumn()
  cretaedAt: Date;

  @UpdateDateColumn()
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

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  toJSON() {
    return instanceToPlain(this);
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      try {
        // Only hash if it's not already hashed
        if (getRounds(this.password) === 0) {
          const hash = hashSync(this.password, 10);
          this.password = hash;
        }
      } catch (error) {
        // If getRounds fails, it means the password is not a valid bcrypt hash
        const hash = hashSync(this.password, 10);
        this.password = hash;
      }
    }
  }
}
