import { Test, TestingModule } from '@nestjs/testing';
import { StorefrontService } from './storefront.service';

describe('StorefrontService', () => {
  let service: StorefrontService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorefrontService],
    }).compile();

    service = module.get<StorefrontService>(StorefrontService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
