import { Test, TestingModule } from '@nestjs/testing';
import { AdminProfilesController } from './admin-profiles.controller';
import { AdminProfilesService } from './admin-profiles.service';

describe('AdminProfilesController', () => {
  let controller: AdminProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProfilesController],
      providers: [AdminProfilesService],
    }).compile();

    controller = module.get<AdminProfilesController>(AdminProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
