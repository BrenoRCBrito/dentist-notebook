import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.PaymentCreateArgs) {
    return this.prisma.payment.create(args);
  }

  findAll(args?: Prisma.PaymentFindManyArgs) {
    return this.prisma.payment.findMany(args);
  }

  findOne(args: Prisma.PaymentFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.payment.findUnique(args);
  }

  update(args: Prisma.PaymentUpdateArgs) {
    return this.prisma.payment.update(args);
  }

  remove(args: Prisma.PaymentDeleteArgs) {
    return this.prisma.payment.delete(args);
  }
}
