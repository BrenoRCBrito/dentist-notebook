import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createDoctor1Input,
  doctor1,
  doctor2,
  updatedDoctor2,
  updateDoctor2Input,
} from '../../mock/doctor';
import { PrismaService } from '../prisma/prisma.service';
import { DoctorService } from './doctor.service';

const results = {
  create: doctor1,
  findMany: [doctor1, doctor2],
  update: updatedDoctor2,
  findUnique: doctor2,
  delete: doctor2,
};

describe('DoctorService', () => {
  let service: DoctorService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<DoctorService>(DoctorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created doctor', async () => {
      prismaService.doctor.create = jest.fn().mockResolvedValue(results.create);
      expect(await service.create({ data: createDoctor1Input })).toStrictEqual(
        results.create,
      );
      expect(prismaService.doctor.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      prismaService.doctor.findMany = jest
        .fn()
        .mockResolvedValue(results.findMany);
      expect(await service.findAll()).toStrictEqual(results.findMany);
      expect(prismaService.doctor.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a doctor with the provided id', async () => {
      prismaService.doctor.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(await service.findOne({ where: { id: 2 } })).toStrictEqual(
        results.findUnique,
      );
      expect(prismaService.doctor.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a doctor with the provided id and altered data', async () => {
      prismaService.doctor.update = jest.fn().mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updateDoctor2Input.id },
          data: updateDoctor2Input,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.doctor.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted doctor with the provided id', async () => {
      prismaService.doctor.delete = jest.fn().mockResolvedValue(results.delete);
      expect(await service.remove({ where: { id: 2 } })).toStrictEqual(
        results.delete,
      );
      expect(prismaService.doctor.delete).toHaveBeenCalledTimes(1);
    });
  });
});
