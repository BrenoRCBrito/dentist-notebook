import { Injectable } from '@nestjs/common';
import { Prisma, TokenStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import CreateRefreshTokenInput from './dto/create-refresh-token.input';
import UpdateRefreshTokenInput from './dto/update-refresh-token.input';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRefreshTokenInput: CreateRefreshTokenInput) {
    return this.prisma.refreshToken.create({
      data: { ...createRefreshTokenInput },
    });
  }

  findOne(where: Prisma.RefreshTokenWhereUniqueInput) {
    return this.prisma.refreshToken.findUnique({ where });
  }

  findValid(doctorId: number) {
    return this.prisma.refreshToken.findMany({
      where: { status: TokenStatus.VALID, doctorId },
    });
  }

  update(updateRefreshTokenInput: UpdateRefreshTokenInput) {
    return this.prisma.refreshToken.update({
      where: { id: updateRefreshTokenInput.id },
      data: updateRefreshTokenInput,
    });
  }

  remove(tokenId: string) {
    return this.prisma.refreshToken.delete({ where: { id: tokenId } });
  }
}
