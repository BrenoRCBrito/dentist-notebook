import { Module } from '@nestjs/common';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { PaymentService } from '../payment/payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethodResolver } from './payment-method.resolver';
import { PaymentMethodService } from './payment-method.service';

@Module({
  providers: [
    PrismaService,
    PaymentMethodResolver,
    PaymentMethodService,
    GroupService,
    DoctorService,
    PaymentService,
  ],
})
export class PaymentMethodModule {}
