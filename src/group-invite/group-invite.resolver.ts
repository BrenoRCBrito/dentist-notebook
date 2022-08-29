import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupInviteService } from './group-invite.service';
import { CreateGroupInviteInput } from './dto/create-group-invite.input';
import { UpdateGroupInviteInput } from './dto/update-group-invite.input';

@Resolver('GroupInvite')
export class GroupInviteResolver {
  constructor(private readonly groupInviteService: GroupInviteService) {}

  @Mutation('createGroupInvite')
  create(@Args('createGroupInviteInput') createGroupInviteInput: CreateGroupInviteInput) {
    return this.groupInviteService.create(createGroupInviteInput);
  }

  @Query('groupInvite')
  findAll() {
    return this.groupInviteService.findAll();
  }

  @Query('groupInvite')
  findOne(@Args('id') id: number) {
    return this.groupInviteService.findOne(id);
  }

  @Mutation('updateGroupInvite')
  update(@Args('updateGroupInviteInput') updateGroupInviteInput: UpdateGroupInviteInput) {
    return this.groupInviteService.update(updateGroupInviteInput.id, updateGroupInviteInput);
  }

  @Mutation('removeGroupInvite')
  remove(@Args('id') id: number) {
    return this.groupInviteService.remove(id);
  }
}
