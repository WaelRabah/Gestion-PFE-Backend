import { Test, TestingModule } from '@nestjs/testing';
import { EnseignantsController } from './enseignants.controller';

describe('EnseignantsController', () => {
  let controller: EnseignantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnseignantsController],
    }).compile();

    controller = module.get<EnseignantsController>(EnseignantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
