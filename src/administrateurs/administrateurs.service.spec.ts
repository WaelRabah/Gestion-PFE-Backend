import { Test, TestingModule } from '@nestjs/testing';
import { AdministrateursService } from './administrateurs.service';

describe('AdministrateursService', () => {
  let service: AdministrateursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministrateursService],
    }).compile();

    service = module.get<AdministrateursService>(AdministrateursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
