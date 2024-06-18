import { Test, TestingModule } from '@nestjs/testing';
import { ChauffeurProfilesController } from './chauffeur-profiles.controller';
import { ChauffeurProfilesService } from './chauffeur-profiles.service';

describe('ChauffeurProfilesController', () => {
  let controller: ChauffeurProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChauffeurProfilesController],
      providers: [ChauffeurProfilesService],
    }).compile();

    controller = module.get<ChauffeurProfilesController>(ChauffeurProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
