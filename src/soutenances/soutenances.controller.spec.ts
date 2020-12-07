import { Test, TestingModule } from '@nestjs/testing';
import { SoutenancesController } from './soutenances.controller';

describe('SoutenancesController', () => {
  let controller: SoutenancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoutenancesController],
    }).compile();

    controller = module.get<SoutenancesController>(SoutenancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
