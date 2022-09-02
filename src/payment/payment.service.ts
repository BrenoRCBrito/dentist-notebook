import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPaymentInput: CreatePaymentInput) {
    return this.prisma.payment.create({ data: createPaymentInput });
  }

  findAll() {
    return this.prisma.payment.findMany();
  }

  findAllByClient(clientId: number) {
    return this.prisma.payment.findMany({
      where: {
        clientId,
      },
    });
  }

  findAllByGroup(groupId: number) {
    return this.prisma.payment.findMany({
      where: { groupId },
    });
  }

  findAllByDoctor(doctorId: number) {
    return this.prisma.payment.findMany({
      where: { doctorId },
    });
  }

  findAllByJob(jobId: number) {
    return this.prisma.payment.findMany({ where: { jobId } });
  }

  findAllByMethod(paymentMethodId: number) {
    return this.prisma.payment.findMany({ where: { paymentMethodId } });
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  update(id: number, updatePaymentInput: UpdatePaymentInput) {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentInput,
    });
  }

  remove(id: number) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
