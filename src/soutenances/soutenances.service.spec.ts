import { Test, TestingModule } from '@nestjs/testing';
import { SoutenancesService } from './soutenances.service';

describe('SoutenancesService', () => {
  let service: SoutenancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoutenancesService],
    }).compile();

    service = module.get<SoutenancesService>(SoutenancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
