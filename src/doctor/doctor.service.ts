import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.DoctorCreateArgs) {
    return this.prisma.doctor.create(args);
  }

  findAll(args?: Prisma.DoctorFindManyArgs) {
    return this.prisma.doctor.findMany(args);
  }

  findOne(args: Prisma.DoctorFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.doctor.findUnique(args);
  }

  update(args: Prisma.DoctorUpdateArgs) {
    return this.prisma.doctor.update(args);
  }

  remove(args: Prisma.DoctorDeleteArgs) {
    return this.prisma.doctor.delete(args);
  }
}
