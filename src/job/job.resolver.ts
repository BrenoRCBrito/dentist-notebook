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
    return this.jobService.create({ data: createJobInput });
  }

  @Query(() => [Job], { name: 'jobs' })
  findAll() {
    return this.jobService.findAll();
  }

  @Query(() => Job, { name: 'job' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.findOne({ where: { id } });
  }

  @Mutation(() => Job)
  updateJob(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.jobService.update({
      where: { id: updateJobInput.id },
      data: updateJobInput,
    });
  }

  @Mutation(() => Job)
  removeJob(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.remove({ where: { id } });
  }

  @ResolveField()
  jobType(@Parent() job: Job) {
    return this.jobTypeService.findOne({ where: { id: job.jobTypeId } });
  }

  @ResolveField()
  group(@Parent() job: Job) {
    return this.groupService.findOne({ where: { id: job.groupId } });
  }

  @ResolveField()
  doctor(@Parent() job: Job) {
    return this.doctorService.findOne({ where: { id: job.doctorId } });
  }

  @ResolveField()
  client(@Parent() job: Job) {
    return this.clientService.findOne({ where: { id: job.clientId } });
  }

  @ResolveField()
  payments(@Parent() job: Job) {
    return this.paymentService.findAll({ where: { jobId: job.id } });
  }
}
