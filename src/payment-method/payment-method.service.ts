import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.PaymentMethodCreateArgs) {
    return this.prisma.paymentMethod.create(args);
  }

  findAll(args?: Prisma.PaymentMethodFindManyArgs) {
    return this.prisma.paymentMethod.findMany(args);
  }

  findOne(args: Prisma.PaymentMethodFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.paymentMethod.findUnique(args);
  }

  update(args: Prisma.PaymentMethodUpdateArgs) {
    return this.prisma.paymentMethod.update(args);
  }

  remove(args: Prisma.PaymentMethodDeleteArgs) {
    return this.prisma.paymentMethod.delete(args);
  }
}
