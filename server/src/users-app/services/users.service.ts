import { Inject, Injectable } from '@nestjs/common';
import { DataSource, ILike, Not } from 'typeorm';
import User from '../entities/user.entity';
import { ConfigService } from '@salman3001/nest-config-module';
import { Config } from 'src/core/config/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IUserPolicy } from '../policies/user.policy';
import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import Profile from '../entities/profile.entity';
import { AuthUserType } from 'src/core/utils/types/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly config: ConfigService,
    @Inject('userPolicy')
    private readonly userPolicy: PolicyService<IUserPolicy>,
    @InjectDataSource('usersApp') private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto, authUser: AuthUserType) {
    this.userPolicy.authorize('create', authUser);
    const userExist = await this.dataSource.manager.findOneBy(User, {
      email: createUserDto.email,
    });

    if (userExist) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'User Email Already exist',
      });
    }

    return await this.dataSource.transaction(async (manager) => {
      const user = manager.create(User, createUserDto);
      const profile = manager.create(Profile, { user: user });
      await manager.save(user);
      await manager.save(profile);
      return user;
    });
  }

  async findAll(query?: {
    page?: number;
    perPage?: number;
    search?: string;
    orderBy?: string;
  }) {
    this.userPolicy.authorize('findAll');
    const take = query?.perPage || this.config.get<Config>().defaultPerPage;
    const skip = ((query?.page || 1) - 1) * take;

    const [orderBy, orderDirection] = query?.orderBy
      ? query?.orderBy.split(':')
      : [];

    const [users, count] = await this.dataSource.manager.findAndCount(User, {
      where: query?.search
        ? {
            firstName: ILike(`%${query.search}%`),
            lastName: ILike(`%${query.search}%`),
          }
        : {},
      order: orderBy ? { [orderBy]: orderDirection } : {},
      skip,
      take,
    });

    return { users, count, perPage: take };
  }

  async findOne(id: number) {
    this.userPolicy.authorize('find');
    const user = await this.dataSource.manager.findOneByOrFail(User, { id });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    authUser: AuthUserType,
  ) {
    const user = await this.dataSource.manager.findOneByOrFail(User, { id });
    this.userPolicy.authorize('update', authUser);

    const emailExist = await this.dataSource.manager.findOne(User, {
      where: { email: updateUserDto.email, id: Not(id) },
    });

    if (emailExist) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'User Email Already exist',
      });
    }
    await this.dataSource.manager.update(User, user, updateUserDto);
    return user;
  }

  async remove(id: number, authUser: AuthUserType) {
    const user = await this.dataSource.manager.findOneByOrFail(User, { id });
    this.userPolicy.authorize('remove', authUser);
    await this.dataSource.manager.softRemove(user);
    return user;
  }
}
