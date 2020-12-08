import { Test, TestingModule } from '@nestjs/testing';
import { EnseignantsService } from './enseignants.service';

describe('EnseignantsService', () => {
  let service: EnseignantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnseignantsService],
    }).compile();

    service = module.get<EnseignantsService>(EnseignantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
