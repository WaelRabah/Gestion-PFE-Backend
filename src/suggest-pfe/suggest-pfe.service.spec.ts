import { Test, TestingModule } from '@nestjs/testing';
import { SuggestPfeService } from './suggest-pfe.service';

describe('SuggestPfeService', () => {
  let service: SuggestPfeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestPfeService],
    }).compile();

    service = module.get<SuggestPfeService>(SuggestPfeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
