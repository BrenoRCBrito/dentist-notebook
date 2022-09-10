import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.RefreshTokenCreateArgs) {
    return this.prisma.refreshToken.create(args);
  }

  findOne(args: Prisma.RefreshTokenFindUniqueArgs) {
    if (Object.values(args.where).every((value) => value === null)) return null;
    return this.prisma.refreshToken.findUnique(args);
  }

  update(args: Prisma.RefreshTokenUpdateArgs) {
    return this.prisma.refreshToken.update(args);
  }

  updateMany(args: Prisma.RefreshTokenUpdateManyArgs) {
    return this.prisma.refreshToken.updateMany(args);
  }

  remove(args: Prisma.RefreshTokenDeleteArgs) {
    return this.prisma.refreshToken.delete(args);
  }
}
