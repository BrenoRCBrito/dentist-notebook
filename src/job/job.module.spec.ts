import { Test } from '@nestjs/testing';
import { JobModule } from './job.module';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [JobModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(JobResolver)).toBeInstanceOf(JobResolver);
    expect(module.get(JobService)).toBeInstanceOf(JobService);
  });
});
