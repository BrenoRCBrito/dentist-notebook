import { Test, TestingModule } from '@nestjs/testing';
import { JobTypeResolver } from './job-type.resolver';
import { JobTypeService } from './job-type.service';

describe('JobTypeResolver', () => {
  let resolver: JobTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobTypeResolver, JobTypeService],
    }).compile();

    resolver = module.get<JobTypeResolver>(JobTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
