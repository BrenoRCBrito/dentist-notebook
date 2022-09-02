import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { PrismaService } from '../../prisma/prisma.service';
import { DoctorService } from '../doctor/doctor.service';
import { ClientService } from '../client/client.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentService } from '../payment/payment.service';
import { JobTypeService } from '../job-type/job-type.service';
import { GroupInviteService } from '../group-invite/group-invite.service';

@Module({
  providers: [
    PrismaService,
    GroupResolver,
    GroupService,
    DoctorService,
    ClientService,
    JobService,
    PaymentMethodService,
    PaymentService,
    JobTypeService,
    GroupInviteService,
  ],
})
export class GroupModule {}
