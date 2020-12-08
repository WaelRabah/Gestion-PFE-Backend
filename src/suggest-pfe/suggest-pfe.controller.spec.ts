import { Test, TestingModule } from '@nestjs/testing';
import { SuggestPfeController } from './suggest-pfe.controller';

describe('SuggestPfeController', () => {
  let controller: SuggestPfeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestPfeController],
    }).compile();

    controller = module.get<SuggestPfeController>(SuggestPfeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
