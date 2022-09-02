import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job } from './entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { JobTypeService } from '../job-type/job-type.service';
import { GroupService } from '../group/group.service';
import { DoctorService } from '../doctor/doctor.service';
import { ClientService } from '../client/client.service';
import { PaymentService } from '../payment/payment.service';

@Resolver(() => Job)
export class JobResolver {
  constructor(
    private readonly jobService: JobService,
    private readonly jobTypeService: JobTypeService,
    private readonly groupService: GroupService,
    private readonly doctorService: DoctorService,
    private readonly clientService: ClientService,
    private readonly paymentService: PaymentService,
  ) {}

  @Mutation(() => Job)
  createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this.jobService.create(createJobInput);
  }

  @Query(() => [Job], { name: 'jobs' })
  findAll() {
    return this.jobService.findAll();
  }

  @Query(() => Job, { name: 'job' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.findOne(id);
  }

  @Mutation(() => Job)
  updateJob(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.jobService.update(updateJobInput.id, updateJobInput);
  }

  @Mutation(() => Job)
  removeJob(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.remove(id);
  }

  @ResolveField()
  jobType(@Parent() job: Job) {
    return this.jobTypeService.findOne(job.jobTypeId);
  }

  @ResolveField()
  group(@Parent() job: Job) {
    return this.groupService.findOne(job.groupId);
  }

  @ResolveField()
  doctor(@Parent() job: Job) {
    return this.doctorService.findOne(job.doctorId);
  }

  @ResolveField()
  client(@Parent() job: Job) {
    return this.clientService.findOne(job.clientId);
  }

  @ResolveField()
  payments(@Parent() job: Job) {
    return this.paymentService.findAllByJob(job.id);
  }
}
