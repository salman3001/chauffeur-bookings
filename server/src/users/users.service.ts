import { Inject, Injectable } from '@nestjs/common';
import { DataSource, ILike, Not } from 'typeorm';
import { ConfigService } from '@salman3001/nest-config-module';
import { Config } from 'src/core/config/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IUserPolicy } from './user.policy';
import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';
import { AuthUserType } from 'src/core/utils/types/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from 'src/core/utils/enums/userType';
import { UserFilterQuery, UserRepository } from './user.repository';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { ChauffeurProfileRepository } from 'src/chauffeur-profiles/chuffeur-profile.repository';
import { AdminProfileRepository } from 'src/admin-profiles/admin-profile.repository';
import { weekDays } from 'src/core/utils/helpers';
import { BookedSlotRepository } from 'src/booked-slots/booked-slot.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly config: ConfigService,
    @Inject('userPolicy')
    private readonly userPolicy: PolicyService<IUserPolicy>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly chauffeurProfileRepo: ChauffeurProfileRepository,
    private readonly adminProfileRepo: AdminProfileRepository,
    private readonly bookedSlotRepo: BookedSlotRepository,
  ) {}

  async create(createUserDto: CreateUserDto, authUser: AuthUserType) {
    this.userPolicy.authorize('create', authUser);

    const userExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExist) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'User Email Already exist',
      });
    }

    return await this.dataSource.transaction(async (manager) => {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await manager.save(user);
      const profile = this.profileRepository.create({});
      profile.user = savedUser;
      await manager.save(profile);

      if (savedUser.userType === UserType.CHAUFFEUR) {
        const chauffeurProfile = this.chauffeurProfileRepo.create({});
        chauffeurProfile.user = savedUser;
        await manager.save(chauffeurProfile);
      }

      if (savedUser.userType === UserType.ADMIN) {
        const adminProfile = this.adminProfileRepo.create({});
        adminProfile.user = savedUser;
        await manager.save(adminProfile);
      }

      return user;
    });
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
    this.userPolicy.authorize('findAll', authUser);
    const take = query?.perPage || this.config.get<Config>().defaultPerPage;
    const skip = ((query?.page || 1) - 1) * take;

    const [orderBy, orderDirection] = query?.orderBy
      ? query?.orderBy.split(':')
      : [];

    const [users, count] = await this.userRepository.findAndCount({
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

  async findOne(id: number, authUser: AuthUserType) {
    this.userPolicy.authorize('find', authUser);
    const user = await this.userRepository.findOneByOrFail({ id });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    authUser: AuthUserType,
  ) {
    const user = await this.userRepository.findOneByOrFail({ id });
    this.userPolicy.authorize('update', authUser);

    const emailExist = await this.userRepository.findOne({
      where: { email: updateUserDto.email, id: Not(id) },
    });

    if (emailExist) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'User Email Already exist',
      });
    }
    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number, authUser: AuthUserType) {
    const user = await this.userRepository.findOneByOrFail({ id });
    this.userPolicy.authorize('remove', authUser);
    await this.userRepository.softRemove(user);
    return user;
  }

  async getChauffuer(authUser: AuthUserType, query: UserFilterQuery) {
    this.userPolicy.authorize('getChauffuers', authUser);
    const {
      results: chauffeurs,
      count,
      perPage,
    } = await this.userRepository.getChuffuers(query);

    return { chauffeurs, count, perPage };
  }

  async getAvailableSlots(
    chauffeurId: number,
    date: Date,
    authUser: AuthUserType,
  ) {
    this.userPolicy.authorize('getAvailableSlots', authUser);

    const chauffeur = await this.userRepository.findOneOrFail({
      where: { id: chauffeurId, userType: UserType.CHAUFFEUR },
      relations: { chauffeurProfile: true },
    });

    const alreadyBookedSlots =
      await this.bookedSlotRepo.getChauffeurBookedSlotsByDate(
        chauffeur.id,
        date,
      );

    const dayToCheck = new Date(date).getDay();

    const availableSlots = chauffeur.chauffeurProfile.availability[
      weekDays[dayToCheck] as 'sunday'
    ].filter((slot) => {
      const isBookedSlotExist = alreadyBookedSlots.filter(
        (bs) => bs.slotName === slot.name,
      );

      if (isBookedSlotExist.length > 0) {
        return false;
      }
      return true;
    });

    return availableSlots;
  }
}
