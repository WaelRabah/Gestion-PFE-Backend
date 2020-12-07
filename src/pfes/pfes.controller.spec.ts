import { Test, TestingModule } from '@nestjs/testing';
import { PfesController } from './pfes.controller';

describe('PfesController', () => {
  let controller: PfesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PfesController],
    }).compile();

    controller = module.get<PfesController>(PfesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
