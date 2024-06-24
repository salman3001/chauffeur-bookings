import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { CarsPolicy } from './cars.policy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { CarRepository } from './car.repository';
import { AdminProfileRepository } from 'src/admin-profiles/admin-profile.repository';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, AdminProfile]),
    PolicyModule.register([
      {
        token: 'CarsPolicy',
        policy: CarsPolicy,
      },
    ]),
    FilesModule,
  ],
  controllers: [CarsController],
  providers: [CarsService, CarRepository, AdminProfileRepository],
})
export class CarsModule {}
