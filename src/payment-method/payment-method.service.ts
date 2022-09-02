import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentMethodInput } from './dto/create-payment-method.input';
import { UpdatePaymentMethodInput } from './dto/update-payment-method.input';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPaymentMethodInput: CreatePaymentMethodInput) {
    return this.prisma.paymentMethod.createMany({
      data: createPaymentMethodInput,
    });
  }

  findAll() {
    return this.prisma.paymentMethod.findMany();
  }

  findAllByDoctor(doctorId: number) {
    return this.prisma.paymentMethod.findMany({
      where: { doctorId },
    });
  }

  findAllByGroup(groupId: number) {
    return this.prisma.paymentMethod.findMany({
      where: { groupId },
    });
  }

  findOne(id: number) {
    return this.prisma.paymentMethod.findUnique({ where: { id } });
  }

  update(id: number, updatePaymentMethodInput: UpdatePaymentMethodInput) {
    return this.prisma.paymentMethod.update({
      where: { id },
      data: updatePaymentMethodInput,
    });
  }

  remove(id: number) {
    return this.prisma.paymentMethod.delete({ where: { id } });
  }
}
