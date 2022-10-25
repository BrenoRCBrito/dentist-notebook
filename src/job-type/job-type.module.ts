import { Module } from '@nestjs/common';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { JobService } from '../job/job.service';
import { PrismaService } from '../prisma/prisma.service';
import { JobTypeResolver } from './job-type.resolver';
import { JobTypeService } from './job-type.service';

@Module({
  providers: [
    PrismaService,
    JobTypeResolver,
    JobTypeService,
    GroupService,
    DoctorService,
    JobService,
  ],
})
export class JobTypeModule {}
