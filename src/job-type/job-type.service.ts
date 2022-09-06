import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JobTypeService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.JobTypeCreateArgs) {
    return this.prisma.jobType.create(args);
  }

  findAll(args?: Prisma.JobTypeFindManyArgs) {
    return this.prisma.jobType.findMany(args);
  }

  findOne(args: Prisma.JobTypeFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.jobType.findUnique(args);
  }

  update(args: Prisma.JobTypeUpdateArgs) {
    return this.prisma.jobType.update(args);
  }

  remove(args: Prisma.JobTypeDeleteArgs) {
    return this.prisma.jobType.delete(args);
  }
}
