import { Test, TestingModule } from '@nestjs/testing';
import { AdministrateursController } from './administrateurs.controller';

describe('AdministrateursController', () => {
  let controller: AdministrateursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrateursController],
    }).compile();

    controller = module.get<AdministrateursController>(
      AdministrateursController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
