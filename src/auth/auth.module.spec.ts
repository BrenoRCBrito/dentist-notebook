import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(AuthResolver)).toBeInstanceOf(AuthResolver);
    expect(module.get(AuthService)).toBeInstanceOf(AuthService);
  });
});
