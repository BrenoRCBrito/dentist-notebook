import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import {
  group,
  groupArray,
  int,
} from '../graphql-type-functions/type-functions';
import { GroupInviteService } from '../group-invite/group-invite.service';
import { JobTypeService } from '../job-type/job-type.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentService } from '../payment/payment.service';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { GroupService } from './group.service';

@Resolver(group)
export class GroupResolver {
  constructor(
    private readonly groupService: GroupService,
    private readonly doctorService: DoctorService,
    private readonly clientService: ClientService,
    private readonly jobService: JobService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly paymentService: PaymentService,
    private readonly jobTypeService: JobTypeService,
    private readonly groupInviteService: GroupInviteService,
  ) {}

  @Mutation(group)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.create({ data: createGroupInput });
  }

  @Query(groupArray, { name: 'groups' })
  findAll() {
    return this.groupService.findAll();
  }

  @Query(group, { name: 'group' })
  findOne(@Args('id', { type: int }) id: number) {
    return this.groupService.findOne({ where: { id } });
  }

  @Mutation(group)
  updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupService.update({
      where: { id: updateGroupInput.id },
      data: updateGroupInput,
    });
  }

  @Mutation(group)
  removeGroup(@Args('id', { type: int }) id: number) {
    return this.groupService.remove({ where: { id } });
  }

  @ResolveField()
  admin(@Parent() group: Group) {
    return this.doctorService.findOne({ where: { id: group.adminId } });
  }

  @ResolveField()
  doctors(@Parent() group: Group) {
    return this.doctorService.findAll({
      where: { groups: { some: { id: group.id } } },
    });
  }

  @ResolveField()
  clients(@Parent() group: Group) {
    return this.clientService.findAll({
      where: {
        groups: {
          some: {
            id: group.id,
          },
        },
      },
    });
  }

  @ResolveField()
  jobs(@Parent() group: Group) {
    return this.jobService.findAll({
      where: { groupId: group.id },
    });
  }

  @ResolveField()
  paymentMethods(@Parent() group: Group) {
    return this.paymentMethodService.findAll({
      where: { groupId: group.id },
    });
  }

  @ResolveField()
  payments(@Parent() group: Group) {
    return this.paymentService.findAll({
      where: { groupId: group.id },
    });
  }

  @ResolveField()
  jobTypes(@Parent() group: Group) {
    return this.jobTypeService.findAll({
      where: { groupId: group.id },
    });
  }

  @ResolveField()
  invites(@Parent() group: Group) {
    return this.groupInviteService.findAll({
      where: { groupId: group.id },
    });
  }
}
