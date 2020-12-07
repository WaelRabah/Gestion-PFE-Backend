import { Test, TestingModule } from '@nestjs/testing';
import { AnneeUniversitairesController } from './annee-universitaires.controller';

describe('AnneeUniversitairesController', () => {
  let controller: AnneeUniversitairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnneeUniversitairesController],
    }).compile();

    controller = module.get<AnneeUniversitairesController>(
      AnneeUniversitairesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
