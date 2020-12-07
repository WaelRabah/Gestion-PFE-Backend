import { Test, TestingModule } from '@nestjs/testing';
import { AnneeUniversitairesService } from './annee-universitaires.service';

describe('AnneeUniversitairesService', () => {
  let service: AnneeUniversitairesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnneeUniversitairesService],
    }).compile();

    service = module.get<AnneeUniversitairesService>(
      AnneeUniversitairesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
