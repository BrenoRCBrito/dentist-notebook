import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import { GroupInviteService } from '../group-invite/group-invite.service';
import { JobTypeService } from '../job-type/job-type.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentService } from '../payment/payment.service';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { GroupService } from './group.service';

@Resolver(() => Group)
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

  @Mutation(() => Group)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.create(createGroupInput);
  }

  @Query(() => [Group], { name: 'groups' })
  findAll() {
    return this.groupService.findAll();
  }

  @Query(() => Group, { name: 'group' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupService.findOne(id);
  }

  @Mutation(() => Group)
  updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupService.update(updateGroupInput.id, updateGroupInput);
  }

  @Mutation(() => Group)
  removeGroup(@Args('id', { type: () => Int }) id: number) {
    return this.groupService.remove(id);
  }

  @ResolveField()
  admin(@Parent() group: Group) {
    return this.doctorService.findGroupAdmin(group.adminId);
  }

  @ResolveField()
  doctors(@Parent() group: Group) {
    return this.doctorService.findAllByGroup(group.id);
  }

  @ResolveField()
  clients(@Parent() group: Group) {
    return this.clientService.findAllByGroup(group.id);
  }

  @ResolveField()
  jobs(@Parent() group: Group) {
    return this.jobService.findAllByGroup(group.id);
  }

  @ResolveField()
  paymentMethods(@Parent() group: Group) {
    return this.paymentMethodService.findAllByGroup(group.id);
  }

  @ResolveField()
  payments(@Parent() group: Group) {
    return this.paymentService.findAllByGroup(group.id);
  }

  @ResolveField()
  jobTypes(@Parent() group: Group) {
    return this.jobTypeService.findAllByGroup(group.id);
  }

  @ResolveField()
  invites(@Parent() group: Group) {
    return this.groupInviteService.findAllByGroup(group.id);
  }
}
