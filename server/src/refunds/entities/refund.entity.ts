import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Refund {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  cretaedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
