import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GroupInviteService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.GroupInviteCreateArgs) {
    return this.prisma.groupInvite.create(args);
  }

  findAll(args?: Prisma.GroupInviteFindManyArgs) {
    return this.prisma.groupInvite.findMany(args);
  }

  findOne(args: Prisma.GroupInviteFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.groupInvite.findUnique(args);
  }

  update(args: Prisma.GroupInviteUpdateArgs) {
    return this.prisma.groupInvite.update(args);
  }

  remove(args: Prisma.GroupInviteDeleteArgs) {
    return this.prisma.groupInvite.delete(args);
  }
}
