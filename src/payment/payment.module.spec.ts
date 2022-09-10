import { Test } from '@nestjs/testing';
import { PaymentModule } from './payment.module';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [PaymentModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(PaymentResolver)).toBeInstanceOf(PaymentResolver);
    expect(module.get(PaymentService)).toBeInstanceOf(PaymentService);
  });
});
