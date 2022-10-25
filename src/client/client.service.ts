import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.ClientCreateArgs) {
    return this.prisma.client.create(args);
  }

  findAll(args?: Prisma.ClientFindManyArgs) {
    return this.prisma.client.findMany(args);
  }

  findOne(args: Prisma.ClientFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.client.findUnique(args);
  }

  update(args: Prisma.ClientUpdateArgs) {
    return this.prisma.client.update(args);
  }

  remove(args: Prisma.ClientDeleteArgs) {
    return this.prisma.client.delete(args);
  }
}
