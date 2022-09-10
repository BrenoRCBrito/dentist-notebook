import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DoctorService } from '../doctor/doctor.service';
import {
  groupInvite,
  groupInviteArray,
  int,
} from '../graphql-type-functions/type-functions';
import { GroupService } from '../group/group.service';
import { CreateGroupInviteInput } from './dto/create-group-invite.input';
import { UpdateGroupInviteInput } from './dto/update-group-invite.input';
import { GroupInvite } from './entities/group-invite.entity';
import { GroupInviteService } from './group-invite.service';

@Resolver(groupInvite)
export class GroupInviteResolver {
  constructor(
    private readonly groupInviteService: GroupInviteService,
    private readonly groupService: GroupService,
    private readonly doctorService: DoctorService,
  ) {}

  @Mutation(groupInvite)
  createGroupInvite(
    @Args('createGroupInviteInput')
    createGroupInviteInput: CreateGroupInviteInput,
  ) {
    return this.groupInviteService.create({ data: createGroupInviteInput });
  }

  @Query(groupInviteArray, { name: 'groupInvites' })
  findAll() {
    return this.groupInviteService.findAll();
  }

  @Query(groupInvite, { name: 'groupInvite' })
  findOne(@Args('id', { type: int }) id: number) {
    return this.groupInviteService.findOne({ where: { id } });
  }

  @Mutation(groupInvite)
  updateGroupInvite(
    @Args('updateGroupInviteInput')
    updateGroupInviteInput: UpdateGroupInviteInput,
  ) {
    return this.groupInviteService.update({
      where: { id: updateGroupInviteInput.id },
      data: updateGroupInviteInput,
    });
  }

  @Mutation(groupInvite)
  removeGroupInvite(@Args('id', { type: int }) id: number) {
    return this.groupInviteService.remove({ where: { id } });
  }

  @ResolveField()
  group(@Parent() groupInvite: GroupInvite) {
    return this.groupService.findAll({
      where: { invites: { some: { id: groupInvite.groupId } } },
    });
  }

  @ResolveField()
  doctor(@Parent() groupInvite: GroupInvite) {
    return this.doctorService.findOne({ where: { id: groupInvite.doctorId } });
  }
}
