import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.JobCreateArgs) {
    return this.prisma.job.create(args);
  }

  findAll(args?: Prisma.JobFindManyArgs) {
    return this.prisma.job.findMany(args);
  }

  findOne(args: Prisma.JobFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.job.findUnique(args);
  }

  update(args: Prisma.JobUpdateArgs) {
    return this.prisma.job.update(args);
  }

  remove(args: Prisma.JobDeleteArgs) {
    return this.prisma.job.delete(args);
  }
}
