import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createGroup1Input,
  group1,
  group2,
  updatedGroup2,
  updateGroup2Input,
} from '../../mock/group';
import { PrismaService } from '../prisma/prisma.service';
import { GroupService } from './group.service';

const results = {
  create: group1,
  findMany: [group1, group2],
  update: updatedGroup2,
  findUnique: group2,
  delete: group2,
};

describe('GroupService', () => {
  let service: GroupService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<GroupService>(GroupService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created group', async () => {
      prismaService.group.create = jest.fn().mockResolvedValue(results.create);
      expect(await service.create({ data: createGroup1Input })).toStrictEqual(
        results.create,
      );
      expect(prismaService.group.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      prismaService.group.findMany = jest
        .fn()
        .mockResolvedValue(results.findMany);
      expect(await service.findAll()).toStrictEqual(results.findMany);
      expect(prismaService.group.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a group with the provided id', async () => {
      prismaService.group.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(await service.findOne({ where: { id: 2 } })).toStrictEqual(
        results.findUnique,
      );
      expect(prismaService.group.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a group with the provided id and altered data', async () => {
      prismaService.group.update = jest.fn().mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updateGroup2Input.id },
          data: updateGroup2Input,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.group.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted group with the provided id', async () => {
      prismaService.group.delete = jest.fn().mockResolvedValue(results.delete);
      expect(await service.remove({ where: { id: 2 } })).toStrictEqual(
        results.delete,
      );
      expect(prismaService.group.delete).toHaveBeenCalledTimes(1);
    });
  });
});
