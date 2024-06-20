import { Inject, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { ICarsPolicy } from './cars.policy';
import { AuthUserType } from 'src/core/utils/types/common';

import { CarFilterQuery, CarRepository } from './car.repository';
import { AdminProfileRepository } from 'src/admin-profiles/admin-profile.repository';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CarsPolicy')
    private readonly carsPolicy: PolicyService<ICarsPolicy>,
    private readonly carRepo: CarRepository,
    private readonly adminProfileRepo: AdminProfileRepository,
  ) {}

  async create(createCarDto: CreateCarDto, authUser: AuthUserType) {
    this.carsPolicy.authorize('create', authUser);
    const car = this.carRepo.create(createCarDto);

    const adminProfile = await this.adminProfileRepo.findOneOrFail({
      where: {
        user: { id: authUser?.id },
      },
    });

    car.owner = adminProfile;
    await this.carRepo.save(car);
    return car;
  }

  async findAll(authUser: AuthUserType, query?: CarFilterQuery) {
    this.carsPolicy.authorize('findAll', authUser);

    const { cars, count, perPage } = await this.carRepo.getPaginated(query);

    return { cars, count, perPage };
  }

  async findOne(id: number, authUser: AuthUserType) {
    this.carsPolicy.authorize('find', authUser);
    const car = await this.carRepo.findOneByOrFail({ id });
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto, authUser: AuthUserType) {
    this.carsPolicy.authorize('update', authUser);
    const car = await this.carRepo.findOneByOrFail({ id: id });
    this.carRepo.merge(car, updateCarDto);
    await this.carRepo.save(car);
    return car;
  }

  async remove(id: number, authUser: AuthUserType) {
    const car = await this.carRepo.findOneByOrFail({ id });
    this.carsPolicy.authorize('remove', authUser);
    const deletedCar = await this.carRepo.softRemove(car);
    return deletedCar;
  }
}
