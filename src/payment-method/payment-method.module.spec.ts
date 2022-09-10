import { Test } from '@nestjs/testing';
import { PaymentMethodModule } from './payment-method.module';
import { PaymentMethodResolver } from './payment-method.resolver';
import { PaymentMethodService } from './payment-method.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [PaymentMethodModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(PaymentMethodResolver)).toBeInstanceOf(
      PaymentMethodResolver,
    );
    expect(module.get(PaymentMethodService)).toBeInstanceOf(
      PaymentMethodService,
    );
  });
});
