import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createGroupInvite1Input,
  groupInvite1,
  groupInvite2,
  updatedGroupInvite2,
  updateGroupInvite2Input,
} from '../../mock/group-invite';
import { PrismaService } from '../../prisma/prisma.service';
import { GroupInviteService } from './group-invite.service';

const results = {
  create: groupInvite1,
  findMany: [groupInvite1, groupInvite2],
  update: updatedGroupInvite2,
  findUnique: groupInvite2,
  delete: groupInvite2,
};

describe('GroupInviteService', () => {
  let service: GroupInviteService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupInviteService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<GroupInviteService>(GroupInviteService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created groupInvite', async () => {
      prismaService.groupInvite.create = jest
        .fn()
        .mockResolvedValue(results.create);
      expect(
        await service.create({ data: createGroupInvite1Input }),
      ).toStrictEqual(results.create);
      expect(prismaService.groupInvite.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of groupInvites', async () => {
      prismaService.groupInvite.findMany = jest
        .fn()
        .mockResolvedValue(results.findMany);
      expect(await service.findAll()).toStrictEqual(results.findMany);
      expect(prismaService.groupInvite.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a groupInvite with the provided id', async () => {
      prismaService.groupInvite.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(await service.findOne({ where: { id: 2 } })).toStrictEqual(
        results.findUnique,
      );
      expect(prismaService.groupInvite.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a groupInvite with the provided id and altered data', async () => {
      prismaService.groupInvite.update = jest
        .fn()
        .mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updateGroupInvite2Input.id },
          data: updateGroupInvite2Input,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.groupInvite.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted groupInvite with the provided id', async () => {
      prismaService.groupInvite.delete = jest
        .fn()
        .mockResolvedValue(results.delete);
      expect(await service.remove({ where: { id: 2 } })).toStrictEqual(
        results.delete,
      );
      expect(prismaService.groupInvite.delete).toHaveBeenCalledTimes(1);
    });
  });
});
