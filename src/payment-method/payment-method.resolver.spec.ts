import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodResolver } from './payment-method.resolver';
import { PaymentMethodService } from './payment-method.service';

describe('PaymentMethodResolver', () => {
  let resolver: PaymentMethodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodResolver, PaymentMethodService],
    }).compile();

    resolver = module.get<PaymentMethodResolver>(PaymentMethodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
