import { Test } from '@nestjs/testing';
import { GroupInviteModule } from './group-invite.module';
import { GroupInviteResolver } from './group-invite.resolver';
import { GroupInviteService } from './group-invite.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [GroupInviteModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(GroupInviteResolver)).toBeInstanceOf(GroupInviteResolver);
    expect(module.get(GroupInviteService)).toBeInstanceOf(GroupInviteService);
  });
});
