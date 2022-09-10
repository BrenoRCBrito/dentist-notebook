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
import { int, job, jobArray } from '../graphql-type-functions/type-functions';
import { GroupService } from '../group/group.service';
import { JobTypeService } from '../job-type/job-type.service';
import { PaymentService } from '../payment/payment.service';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { Job } from './entities/job.entity';
import { JobService } from './job.service';

@Resolver(job)
export class JobResolver {
  constructor(
    private readonly jobService: JobService,
    private readonly jobTypeService: JobTypeService,
    private readonly groupService: GroupService,
    private readonly doctorService: DoctorService,
    private readonly clientService: ClientService,
    private readonly paymentService: PaymentService,
  ) {}

  @Mutation(job)
  createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this.jobService.create({ data: createJobInput });
  }

  @Query(jobArray, { name: 'jobs' })
  findAll() {
    return this.jobService.findAll();
  }

  @Query(job, { name: 'job' })
  findOne(@Args('id', { type: int }) id: number) {
    return this.jobService.findOne({ where: { id } });
  }

  @Mutation(job)
  updateJob(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.jobService.update({
      where: { id: updateJobInput.id },
      data: updateJobInput,
    });
  }

  @Mutation(job)
  removeJob(@Args('id', { type: int }) id: number) {
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
