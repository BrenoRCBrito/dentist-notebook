import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { PrismaService } from '../../prisma/prisma.service';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { JobService } from '../job/job.service';
import { PaymentService } from '../payment/payment.service';

@Module({
  providers: [
    PrismaService,
    ClientResolver,
    ClientService,
    DoctorService,
    GroupService,
    JobService,
    PaymentService,
  ],
})
export class ClientModule {}
