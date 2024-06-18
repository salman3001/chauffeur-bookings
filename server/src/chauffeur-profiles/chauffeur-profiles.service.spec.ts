import { Test, TestingModule } from '@nestjs/testing';
import { ChauffeurProfilesService } from './chauffeur-profiles.service';

describe('ChauffeurProfilesService', () => {
  let service: ChauffeurProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChauffeurProfilesService],
    }).compile();

    service = module.get<ChauffeurProfilesService>(ChauffeurProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
