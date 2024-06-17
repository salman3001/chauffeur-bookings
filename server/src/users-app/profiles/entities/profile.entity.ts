import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional, ValidateNested } from 'class-validator';
import Image from '../../../core/utils/enities/Image.entity';
import User from 'src/users-app/users/entities/user.entity';

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: true })
  @ValidateNested()
  @IsOptional()
  avatar?: Image;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
