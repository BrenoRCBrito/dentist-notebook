import { Test } from '@nestjs/testing';
import { GroupModule } from './group.module';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [GroupModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(GroupResolver)).toBeInstanceOf(GroupResolver);
    expect(module.get(GroupService)).toBeInstanceOf(GroupService);
  });
});
