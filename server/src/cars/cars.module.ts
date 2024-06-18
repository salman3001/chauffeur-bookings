import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { CarsPolicy } from './cars.policy';

@Module({
  imports: [
    PolicyModule.register([
      {
        token: 'CarsPolicy',
        policy: CarsPolicy,
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
