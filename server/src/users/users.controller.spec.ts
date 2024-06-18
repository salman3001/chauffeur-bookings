import { TestBed } from '@automock/jest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UsersController).compile();
    controller = unit;
    service = unitRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    await controller.create({} as any, {} as any);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('findall', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('find', async () => {
    await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledTimes(1);
  });

  it('update', async () => {
    await controller.update('1', {} as any, {} as any);
    expect(service.update).toHaveBeenCalledTimes(1);
  });

  it('remove', async () => {
    await controller.remove('1', {} as any);
    expect(service.remove).toHaveBeenCalledTimes(1);
  });
});
