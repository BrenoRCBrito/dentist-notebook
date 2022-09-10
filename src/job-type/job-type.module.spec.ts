import { Test } from '@nestjs/testing';
import { JobTypeModule } from './job-type.module';
import { JobTypeResolver } from './job-type.resolver';
import { JobTypeService } from './job-type.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [JobTypeModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(JobTypeResolver)).toBeInstanceOf(JobTypeResolver);
    expect(module.get(JobTypeService)).toBeInstanceOf(JobTypeService);
  });
});
