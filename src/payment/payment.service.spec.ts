import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createPayment1Input,
  payment1,
  payment2,
  updatedPayment2,
  updatePayment2Input,
} from '../../mock/payment';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentService } from './payment.service';

const results = {
  create: payment1,
  findMany: [payment1, payment2],
  update: updatedPayment2,
  findUnique: payment2,
  delete: payment2,
};

describe('PaymentService', () => {
  let service: PaymentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<PaymentService>(PaymentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created payment', async () => {
      prismaService.payment.create = jest
        .fn()
        .mockResolvedValue(results.create);
      expect(await service.create({ data: createPayment1Input })).toStrictEqual(
        results.create,
      );
      expect(prismaService.payment.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      prismaService.payment.findMany = jest
        .fn()
        .mockResolvedValue(results.findMany);
      expect(await service.findAll()).toStrictEqual(results.findMany);
      expect(prismaService.payment.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a payment with the provided id', async () => {
      prismaService.payment.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(await service.findOne({ where: { id: 2 } })).toStrictEqual(
        results.findUnique,
      );
      expect(prismaService.payment.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a payment with the provided id and altered data', async () => {
      prismaService.payment.update = jest
        .fn()
        .mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updatePayment2Input.id },
          data: updatePayment2Input,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.payment.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted payment with the provided id', async () => {
      prismaService.payment.delete = jest
        .fn()
        .mockResolvedValue(results.delete);
      expect(await service.remove({ where: { id: 2 } })).toStrictEqual(
        results.delete,
      );
      expect(prismaService.payment.delete).toHaveBeenCalledTimes(1);
    });
  });
});
