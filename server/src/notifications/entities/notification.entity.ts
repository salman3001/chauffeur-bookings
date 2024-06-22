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

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  data: NotificationData;

  @Column('timestamp', { nullable: true })
  readAt: Date | null;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
