import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createPaymentMethod1Input,
  paymentMethod1,
  paymentMethod2,
  updatedPaymentMethod2,
  updatePaymentMethod2Input,
} from '../../mock/payment-method';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethodService } from './payment-method.service';

const results = {
  create: paymentMethod1,
  findMany: [paymentMethod1, paymentMethod2],
  update: updatedPaymentMethod2,
  findUnique: paymentMethod2,
  delete: paymentMethod2,
};

describe('PaymentMethodService', () => {
  let service: PaymentMethodService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<PaymentMethodService>(PaymentMethodService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created paymentMethod', async () => {
      prismaService.paymentMethod.create = jest
        .fn()
        .mockResolvedValue(results.create);
      expect(
        await service.create({ data: createPaymentMethod1Input }),
      ).toStrictEqual(results.create);
      expect(prismaService.paymentMethod.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of paymentMethods', async () => {
      prismaService.paymentMethod.findMany = jest
        .fn()
        .mockResolvedValue(results.findMany);
      expect(await service.findAll()).toStrictEqual(results.findMany);
      expect(prismaService.paymentMethod.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a paymentMethod with the provided id', async () => {
      prismaService.paymentMethod.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(await service.findOne({ where: { id: 2 } })).toStrictEqual(
        results.findUnique,
      );
      expect(prismaService.paymentMethod.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a paymentMethod with the provided id and altered data', async () => {
      prismaService.paymentMethod.update = jest
        .fn()
        .mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updatePaymentMethod2Input.id },
          data: updatePaymentMethod2Input,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.paymentMethod.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted paymentMethod with the provided id', async () => {
      prismaService.paymentMethod.delete = jest
        .fn()
        .mockResolvedValue(results.delete);
      expect(await service.remove({ where: { id: 2 } })).toStrictEqual(
        results.delete,
      );
      expect(prismaService.paymentMethod.delete).toHaveBeenCalledTimes(1);
    });
  });
});
