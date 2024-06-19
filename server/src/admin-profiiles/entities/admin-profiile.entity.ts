import { Car } from 'src/cars/entities/car.entity';
import User from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AdminProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Car, (car) => car.owner, { onDelete: 'CASCADE' })
  cars: Car[];

  @OneToOne(() => User, (user) => user.adminProfile)
  @JoinColumn()
  user: User;
}
