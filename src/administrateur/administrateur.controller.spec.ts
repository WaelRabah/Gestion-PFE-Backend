import { Test, TestingModule } from '@nestjs/testing';
import { AdministrateurController } from './administrateur.controller';

describe('AdministrateurController', () => {
  let controller: AdministrateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrateurController],
    }).compile();

    controller = module.get<AdministrateurController>(AdministrateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
