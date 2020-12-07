import { Test, TestingModule } from '@nestjs/testing';
import { AnneeUniService } from './annee-uni.service';

describe('AnneeUniService', () => {
  let service: AnneeUniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnneeUniService],
    }).compile();

    service = module.get<AnneeUniService>(AnneeUniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
