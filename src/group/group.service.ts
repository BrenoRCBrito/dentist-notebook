import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.GroupCreateArgs) {
    return this.prisma.group.create(args);
  }

  findAll(args?: Prisma.GroupFindManyArgs) {
    return this.prisma.group.findMany(args);
  }

  findOne(args: Prisma.GroupFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.group.findUnique(args);
  }

  update(args: Prisma.GroupUpdateArgs) {
    return this.prisma.group.update(args);
  }

  remove(args: Prisma.GroupDeleteArgs) {
    return this.prisma.group.delete(args);
  }
}
