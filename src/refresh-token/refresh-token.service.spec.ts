import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenStatus } from '@prisma/client';
import {
  createRefreshToken1Input,
  RefreshToken1,
  RefreshToken2,
  RefreshToken2UUID,
  updatedRefreshToken2,
  updateManyRefreshToken,
} from '../../mock/refresh-token';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenService } from './refresh-token.service';

const results = {
  create: RefreshToken1,
  findMany: [RefreshToken1, RefreshToken2],
  update: updatedRefreshToken2,
  updateMany: { count: 2 },
  findUnique: RefreshToken2,
  delete: RefreshToken2,
};

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokenService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<RefreshTokenService>(RefreshTokenService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created refreshToken', async () => {
      prismaService.refreshToken.create = jest
        .fn()
        .mockResolvedValue(results.create);
      expect(
        await service.create({ data: createRefreshToken1Input }),
      ).toStrictEqual(results.create);
      expect(prismaService.refreshToken.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a refreshToken with the provided id', async () => {
      prismaService.refreshToken.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(
        await service.findOne({ where: { id: RefreshToken2UUID } }),
      ).toStrictEqual(results.findUnique);
      expect(prismaService.refreshToken.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a refreshToken with the provided id and altered data', async () => {
      prismaService.refreshToken.update = jest
        .fn()
        .mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updatedRefreshToken2.id },
          data: updatedRefreshToken2,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.refreshToken.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateMany', () => {
    it('should return a refreshToken with the provided id and altered data', async () => {
      prismaService.refreshToken.updateMany = jest
        .fn()
        .mockResolvedValue(results.updateMany);
      expect(
        await service.updateMany({
          where: { status: TokenStatus.VALID },
          data: updateManyRefreshToken,
        }),
      ).toStrictEqual(results.updateMany);
      expect(prismaService.refreshToken.updateMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted refreshToken with the provided id', async () => {
      prismaService.refreshToken.delete = jest
        .fn()
        .mockResolvedValue(results.delete);
      expect(
        await service.remove({ where: { id: RefreshToken2UUID } }),
      ).toStrictEqual(results.delete);
      expect(prismaService.refreshToken.delete).toHaveBeenCalledTimes(1);
    });
  });
});
