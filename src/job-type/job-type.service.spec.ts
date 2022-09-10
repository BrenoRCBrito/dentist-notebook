import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createJobType1Input,
  jobType1,
  jobType2,
  updatedJobType2,
  updateJobType2Input,
} from '../../mock/job-type';
import { PrismaService } from '../../prisma/prisma.service';
import { JobTypeService } from './job-type.service';

const results = {
  create: jobType1,
  findMany: [jobType1, jobType2],
  update: updatedJobType2,
  findUnique: jobType2,
  delete: jobType2,
};

describe('JobTypeService', () => {
  let service: JobTypeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobTypeService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<JobTypeService>(JobTypeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created jobType', async () => {
      prismaService.jobType.create = jest
        .fn()
        .mockResolvedValue(results.create);
      expect(await service.create({ data: createJobType1Input })).toStrictEqual(
        results.create,
      );
      expect(prismaService.jobType.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of jobTypes', async () => {
      prismaService.jobType.findMany = jest
        .fn()
        .mockResolvedValue(results.findMany);
      expect(await service.findAll()).toStrictEqual(results.findMany);
      expect(prismaService.jobType.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a jobType with the provided id', async () => {
      prismaService.jobType.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(await service.findOne({ where: { id: 2 } })).toStrictEqual(
        results.findUnique,
      );
      expect(prismaService.jobType.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a jobType with the provided id and altered data', async () => {
      prismaService.jobType.update = jest
        .fn()
        .mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updateJobType2Input.id },
          data: updateJobType2Input,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.jobType.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted jobType with the provided id', async () => {
      prismaService.jobType.delete = jest
        .fn()
        .mockResolvedValue(results.delete);
      expect(await service.remove({ where: { id: 2 } })).toStrictEqual(
        results.delete,
      );
      expect(prismaService.jobType.delete).toHaveBeenCalledTimes(1);
    });
  });
});
