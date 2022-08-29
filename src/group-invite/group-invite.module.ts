import { Module } from '@nestjs/common';
import { GroupInviteService } from './group-invite.service';
import { GroupInviteResolver } from './group-invite.resolver';

@Module({
  providers: [GroupInviteResolver, GroupInviteService]
})
export class GroupInviteModule {}
