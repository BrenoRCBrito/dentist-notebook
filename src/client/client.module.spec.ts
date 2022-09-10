import { Test } from '@nestjs/testing';
import { ClientModule } from './client.module';
import { ClientResolver } from './client.resolver';
import { ClientService } from './client.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ClientModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ClientResolver)).toBeInstanceOf(ClientResolver);
    expect(module.get(ClientService)).toBeInstanceOf(ClientService);
  });
});
