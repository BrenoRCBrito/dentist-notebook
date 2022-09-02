import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GroupInviteService } from '../group-invite/group-invite.service';
import { GroupService } from '../group/group.service';
import { JobTypeService } from '../job-type/job-type.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentService } from '../payment/payment.service';
import { ClientService } from '../client/client.service';
import { DoctorService } from './doctor.service';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { Doctor } from './entities/doctor.entity';
import { JobService } from '../job/job.service';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly clientService: ClientService,
    private readonly groupService: GroupService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly paymentService: PaymentService,
    private readonly jobService: JobService,
    private readonly jobTypeService: JobTypeService,
    private readonly groupInviteService: GroupInviteService,
  ) {}

  @Mutation(() => Doctor)
  createDoctor(
    @Args('createDoctorInput') createDoctorInput: CreateDoctorInput,
  ) {
    return this.doctorService.create(createDoctorInput);
  }

  @Query(() => [Doctor], { name: 'doctors' })
  findAll() {
    return this.doctorService.findAll();
  }

  @Query(() => Doctor, { name: 'doctor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.doctorService.findOne(id);
  }

  @Mutation(() => Doctor)
  updateDoctor(
    @Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput,
  ) {
    return this.doctorService.update(updateDoctorInput.id, updateDoctorInput);
  }

  @Mutation(() => Doctor)
  removeDoctor(@Args('id', { type: () => Int }) id: number) {
    return this.doctorService.remove(id);
  }

  @ResolveField()
  clients(@Parent() doctor: Doctor) {
    return this.clientService.findAllByDoctor(doctor.id);
  }

  @ResolveField()
  managedGroups(@Parent() doctor: Doctor) {
    return this.groupService.findAllByAdmin(doctor.id);
  }

  @ResolveField()
  groups(@Parent() doctor: Doctor) {
    return this.groupService.findAllByDoctor(doctor.id);
  }

  @ResolveField()
  jobs(@Parent() doctor: Doctor) {
    return this.jobService.findAllByDoctor(doctor.id);
  }

  @ResolveField()
  paymentMethods(@Parent() doctor: Doctor) {
    return this.paymentMethodService.findAllByDoctor(doctor.id);
  }

  @ResolveField()
  payments(@Parent() doctor: Doctor) {
    return this.paymentService.findAllByDoctor(doctor.id);
  }

  @ResolveField()
  jobTypes(@Parent() doctor: Doctor) {
    return this.jobTypeService.findAllByDoctor(doctor.id);
  }

  @ResolveField()
  groupInvites(@Parent() doctor: Doctor) {
    return this.groupInviteService.findAllByDoctor(doctor.id);
  }
}
