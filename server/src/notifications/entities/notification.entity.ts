import User from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotificationData } from '../types/NotificationData';
import { DateTime } from 'luxon';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  data: NotificationData;

  @Column('timestamp', { nullable: true })
  readAt: DateTime | null;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
