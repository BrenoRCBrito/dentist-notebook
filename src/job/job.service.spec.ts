import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createJob1Input,
  job1,
  job2,
  updatedJob2,
  updateJob2Input,
} from '../../mock/job';
import { PrismaService } from '../../prisma/prisma.service';
import { JobService } from './job.service';

const results = {
  create: job1,
  findMany: [job1, job2],
  update: updatedJob2,
  findUnique: job2,
  delete: job2,
};

describe('JobService', () => {
  let service: JobService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<JobService>(JobService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created job', async () => {
      prismaService.job.create = jest.fn().mockResolvedValue(results.create);
      expect(await service.create({ data: createJob1Input })).toStrictEqual(
        results.create,
      );
      expect(prismaService.job.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      prismaService.job.findMany = jest
        .fn()
        .mockResolvedValue(results.findMany);
      expect(await service.findAll()).toStrictEqual(results.findMany);
      expect(prismaService.job.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a job with the provided id', async () => {
      prismaService.job.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(await service.findOne({ where: { id: 2 } })).toStrictEqual(
        results.findUnique,
      );
      expect(prismaService.job.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a job with the provided id and altered data', async () => {
      prismaService.job.update = jest.fn().mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updateJob2Input.id },
          data: updateJob2Input,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.job.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted job with the provided id', async () => {
      prismaService.job.delete = jest.fn().mockResolvedValue(results.delete);
      expect(await service.remove({ where: { id: 2 } })).toStrictEqual(
        results.delete,
      );
      expect(prismaService.job.delete).toHaveBeenCalledTimes(1);
    });
  });
});
