import { Test, TestingModule } from '@nestjs/testing';
import { PfesService } from './pfes.service';

describe('PfesService', () => {
  let service: PfesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PfesService],
    }).compile();

    service = module.get<PfesService>(PfesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
