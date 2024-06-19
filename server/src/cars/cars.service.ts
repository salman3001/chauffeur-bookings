import { Inject, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { ICarsPolicy } from './cars.policy';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, ILike } from 'typeorm';
import { AuthUserType } from 'src/core/utils/types/common';
import { Car } from './entities/car.entity';
import { AdminProfile } from 'src/admin-profiiles/entities/admin-profiile.entity';
import { ConfigService } from '@salman3001/nest-config-module';
import { Config } from 'src/core/config/config';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CarsPolicy')
    private readonly carsPolicy: PolicyService<ICarsPolicy>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly config: ConfigService,
  ) {}
  async create(createCarDto: CreateCarDto, authUser: AuthUserType) {
    this.carsPolicy.authorize('create', authUser);
    const car = new Car();
    Object.assign(car, createCarDto);
    const adminProfile = await this.dataSource.manager.findOneOrFail(
      AdminProfile,
      {
        where: {
          user: { id: authUser?.id },
        },
      },
    );

    car.owner = adminProfile;
    await this.dataSource.manager.save(Car, car);
    return car;
  }

  async findAll(
    authUser: AuthUserType,
    query?: {
      page?: number;
      perPage?: number;
      search?: string;
      orderBy?: string;
    },
  ) {
    this.carsPolicy.authorize('findAll', authUser);
    const take = query?.perPage || this.config.get<Config>().defaultPerPage;
    const skip = ((query?.page || 1) - 1) * take;

    const [orderBy, orderDirection] = query?.orderBy
      ? query?.orderBy.split(':')
      : [];

    const [cars, count] = await this.dataSource.manager.findAndCount(Car, {
      where: query?.search
        ? {
            name: ILike(`%${query.search}%`),
          }
        : {},
      order: orderBy ? { [orderBy]: orderDirection } : {},
      skip,
      take,
    });

    return { cars, count, perPage: take };
  }

  async findOne(id: number, authUser: AuthUserType) {
    this.carsPolicy.authorize('find', authUser);
    const car = await this.dataSource.manager.findOneByOrFail(Car, { id });
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto, authUser: AuthUserType) {
    this.carsPolicy.authorize('update', authUser);
    const car = await this.dataSource.manager.findOneByOrFail(Car, { id: id });
    Object.assign(car, updateCarDto);
    await this.dataSource.manager.save(Car, car);
    return car;
  }

  async remove(id: number, authUser: AuthUserType) {
    const car = await this.dataSource.manager.findOneByOrFail(Car, { id });
    this.carsPolicy.authorize('remove', authUser);
    const deletedCar = await this.dataSource.manager.softRemove(Car, car);
    return deletedCar;
  }
}
