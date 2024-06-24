import { DataSource, EntityNotFoundError } from 'typeorm';
import { TestBed } from '@automock/jest';
import { getDataSourceToken } from '@nestjs/typeorm';
import { mockedDataSource } from 'src/utils/mocks/mockedDatasource';
import { UsersService } from './users.service';
import User from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { userFactory } from './factory/user.factory';

describe('UsersService', () => {
  let service: UsersService;
  let dataSource: jest.Mocked<DataSource>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(UsersService)
      .mock(ConfigService)
      .using({
        get: () => ({
          defaultPerPage: 20,
        }),
      })
      .mock('userPolicy')
      .using({
        authorize: jest.fn().mockImplementation(() => true),
      })
      .mock(getDataSourceToken('usersApp') as string)
      .using(mockedDataSource)
      .compile();
    service = unit;
    dataSource = unitRef.get(getDataSourceToken('usersApp') as string);
  });

  it('should be defined', () => {
    console.log(dataSource.manager.findOneByOrFail);

    expect(service).toBeDefined();
    expect(dataSource).toBeDefined;
  });

  it('should create user', async () => {
    const fakeUser = userFactory.build();
    jest.spyOn(dataSource.manager, 'findOneBy').mockResolvedValueOnce(null);
    jest.spyOn(dataSource, 'transaction').mockResolvedValueOnce(fakeUser);
    const user = await service.create(fakeUser, {} as any);
    expect(dataSource.manager.findOneBy).toHaveBeenCalled();
    expect(dataSource.transaction).toHaveBeenCalled();
    expect(user).toMatchObject(fakeUser);
  });

  it('should get users', async () => {
    const fakeUsers = userFactory.buildList(3);
    jest
      .spyOn(dataSource.manager, 'findAndCount')
      .mockResolvedValueOnce([fakeUsers, 3]);

    const { users, count } = await service.findAll(fakeUsers[0]);
    expect(dataSource.manager.findAndCount).toHaveBeenCalled();
    expect(users).toHaveLength(3);
    expect(count).toBe(3);
  });

  it('should get one user', async () => {
    const fakeUser = userFactory.build();
    jest
      .spyOn(dataSource.manager, 'findOneByOrFail')
      .mockResolvedValueOnce(fakeUser);
    const user = await service.findOne(1, fakeUser);
    expect(dataSource.manager.findOneByOrFail).toHaveBeenCalled();
    expect(user).toMatchObject(fakeUser);
  });

  it('should throw error if use not found', async () => {
    jest
      .spyOn(dataSource.manager, 'findOneByOrFail')
      .mockImplementationOnce(() => {
        throw new EntityNotFoundError(User, 'User not found');
      });

    expect.assertions(2);
    try {
      await service.findOne(1, userFactory.build());
    } catch (error) {
      expect(dataSource.manager.findOneByOrFail).toHaveBeenCalled();
      expect(error).toBeInstanceOf(EntityNotFoundError);
    }
  });

  it('should update one user', async () => {
    const fakeUser = userFactory.build();
    jest
      .spyOn(dataSource.manager, 'findOneByOrFail')
      .mockResolvedValueOnce(fakeUser);
    const user = await service.update(1, fakeUser, {} as any);
    expect(dataSource.manager.findOneByOrFail).toHaveBeenCalled();
    expect(dataSource.manager.update).toHaveBeenCalled();
    expect(user).toMatchObject(fakeUser);
  });

  it('should remove one user', async () => {
    const fakeUser = userFactory.build();
    jest
      .spyOn(dataSource.manager, 'findOneByOrFail')
      .mockResolvedValueOnce(fakeUser);

    const user = await service.remove(1, {} as any);
    expect(dataSource.manager.softRemove).toHaveBeenCalled();
    expect(dataSource.manager.findOneByOrFail).toHaveBeenCalled();
    expect(user).toMatchObject(fakeUser);
  });
});
