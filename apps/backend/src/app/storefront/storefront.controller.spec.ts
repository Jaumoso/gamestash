import { Test, TestingModule } from '@nestjs/testing';
import { StorefrontController } from './storefront.controller';

describe('StorefrontController', () => {
  let controller: StorefrontController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorefrontController],
    }).compile();

    controller = module.get<StorefrontController>(StorefrontController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
