import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { GroupService } from '../group/group.service';
import { DoctorService } from '../doctor/doctor.service';
import { ClientService } from '../client/client.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';

@Module({
  providers: [
    PrismaService,
    PaymentResolver,
    PaymentService,
    PaymentMethodService,
    GroupService,
    DoctorService,
    ClientService,
    JobService,
  ],
})
export class PaymentModule {}
