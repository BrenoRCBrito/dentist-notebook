import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { JobService } from '../job/job.service';
import { CreateJobTypeInput } from './dto/create-job-type.input';
import { UpdateJobTypeInput } from './dto/update-job-type.input';
import { JobType } from './entities/job-type.entity';
import { JobTypeService } from './job-type.service';

@Resolver(() => JobType)
export class JobTypeResolver {
  constructor(
    private readonly jobTypeService: JobTypeService,
    private readonly groupService: GroupService,
    private readonly doctorService: DoctorService,
    private readonly jobService: JobService,
  ) {}

  @Mutation(() => JobType)
  createJobType(
    @Args('createJobTypeInput') createJobTypeInput: CreateJobTypeInput,
  ) {
    return this.jobTypeService.create({ data: createJobTypeInput });
  }

  @Query(() => [JobType], { name: 'jobTypes' })
  findAll() {
    return this.jobTypeService.findAll();
  }

  @Query(() => JobType, { name: 'jobType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.jobTypeService.findOne({ where: { id } });
  }

  @Mutation(() => JobType)
  updateJobType(
    @Args('updateJobTypeInput') updateJobTypeInput: UpdateJobTypeInput,
  ) {
    return this.jobTypeService.update({
      where: { id: updateJobTypeInput.id },
      data: updateJobTypeInput,
    });
  }

  @Mutation(() => JobType)
  removeJobType(@Args('id', { type: () => Int }) id: number) {
    return this.jobTypeService.remove({ where: { id } });
  }

  @ResolveField()
  group(@Parent() jobType: JobType) {
    return this.groupService.findOne({ where: { id: jobType.groupId } });
  }

  @ResolveField()
  doctor(@Parent() jobType: JobType) {
    return this.doctorService.findOne({ where: { id: jobType.doctorId } });
  }

  @ResolveField()
  jobs(@Parent() jobType: JobType) {
    return this.jobService.findAll({
      where: { jobTypeId: jobType.id },
    });
  }
}
