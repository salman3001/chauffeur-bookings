import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
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
import Profile from './profile.entity';
import { Exclude, instanceToPlain } from 'class-transformer';

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

  @Column('int', { nullable: true })
  otp?: number;

  @CreateDateColumn()
  cretaedAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['remove'],
  })
  @JoinColumn()
  profile: Profile;

  toJSON() {
    return instanceToPlain(this);
  }

  @BeforeInsert()
  hashPassword() {
    console.log('ran');

    if (this.password) {
      const hash = hashSync(this.password, 10);
      this.password = hash;
    }
  }
}
