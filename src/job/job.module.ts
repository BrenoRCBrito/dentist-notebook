import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { JobTypeService } from '../job-type/job-type.service';
import { GroupService } from '../group/group.service';
import { DoctorService } from '../doctor/doctor.service';
import { ClientService } from '../client/client.service';
import { PaymentService } from '../payment/payment.service';

@Module({
  providers: [
    PrismaService,
    JobResolver,
    JobService,
    JobTypeService,
    GroupService,
    DoctorService,
    ClientService,
    PaymentService,
  ],
})
export class JobModule {}
