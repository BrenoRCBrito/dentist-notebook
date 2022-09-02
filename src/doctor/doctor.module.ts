import { Module } from '@nestjs/common';
import { GroupInviteService } from '../group-invite/group-invite.service';
import { GroupService } from '../group/group.service';
import { JobTypeService } from '../job-type/job-type.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentService } from '../payment/payment.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ClientService } from '../client/client.service';
import { DoctorResolver } from './doctor.resolver';
import { DoctorService } from './doctor.service';

@Module({
  providers: [
    PrismaService,
    DoctorResolver,
    DoctorService,
    ClientService,
    JobService,
    PaymentMethodService,
    PaymentService,
    JobTypeService,
    GroupInviteService,
    GroupService,
  ],
})
export class DoctorModule {}
