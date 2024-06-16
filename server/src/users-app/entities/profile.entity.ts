import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional, ValidateNested } from 'class-validator';
import Image from './Image';
import User from './user.entity';

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  @ValidateNested()
  @IsOptional()
  avatar?: Image;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
