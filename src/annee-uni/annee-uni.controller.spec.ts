import { Test, TestingModule } from '@nestjs/testing';
import { AnneeUniController } from './annee-uni.controller';

describe('AnneeUniController', () => {
  let controller: AnneeUniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnneeUniController],
    }).compile();

    controller = module.get<AnneeUniController>(AnneeUniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
