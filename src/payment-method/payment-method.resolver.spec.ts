import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { PaymentService } from '../payment/payment.service';
import { doctor2 } from '../../mock/doctor';
import { group1 } from '../../mock/group';
import { payment1 } from '../../mock/payment';
import {
  createPaymentMethod1Input,
  paymentMethod1,
  paymentMethod2,
  updatedPaymentMethod2,
  updatePaymentMethod2Input,
} from '../../mock/payment-method';
import { PaymentMethodResolver } from './payment-method.resolver';
import { PaymentMethodService } from './payment-method.service';

const results = {
  create: paymentMethod1,
  findAll: [paymentMethod1, paymentMethod2],
  findOne: paymentMethod2,
  update: updatedPaymentMethod2,
  remove: paymentMethod2,
  payments: [payment1],
  doctor: group1,
  group: doctor2,
};

describe('PaymentMethodResolver', () => {
  let resolver: PaymentMethodResolver;
  let service: PaymentMethodService;
  let groupService: GroupService;
  let doctorService: DoctorService;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodResolver],
    })
      .useMocker(createMock)
      .compile();

    resolver = module.get<PaymentMethodResolver>(PaymentMethodResolver);
    service = module.get<PaymentMethodService>(PaymentMethodService);
    groupService = module.get<GroupService>(GroupService);
    doctorService = module.get<DoctorService>(DoctorService);
    paymentService = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createPaymentMethod', () => {
    it('should return the created paymentMethod', async () => {
      service.create = jest.fn().mockResolvedValue(results.create);
      expect(
        await resolver.createPaymentMethod(createPaymentMethod1Input),
      ).toStrictEqual(results.create);
    });
  });

  describe('findAll', () => {
    it('should return an array of paymentMethods', async () => {
      service.findAll = jest.fn().mockResolvedValue(results.findAll);
      expect(await resolver.findAll()).toStrictEqual(results.findAll);
    });
  });

  describe('findOne', () => {
    it('should return a paymentMethod with the provided id', async () => {
      service.findOne = jest.fn().mockResolvedValue(results.findOne);
      expect(await resolver.findOne(2)).toStrictEqual(results.findOne);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      service.findOne = jest.fn().mockResolvedValue(null);
      expect(await resolver.findOne(null)).toStrictEqual(null);
    });
  });

  describe('updatePaymentMethod', () => {
    it('should return a paymentMethod with the provided id and altered data', async () => {
      service.update = jest.fn().mockResolvedValueOnce(results.update);
      expect(
        await resolver.updatePaymentMethod(updatePaymentMethod2Input),
      ).toStrictEqual(results.update);
    });
  });

  describe('removePaymentMethod', () => {
    it('should return the deleted paymentMethod with the provided id', async () => {
      service.remove = jest.fn().mockResolvedValue(results.remove);
      expect(await resolver.removePaymentMethod(2)).toStrictEqual(
        results.remove,
      );
    });
  });

  describe('group', () => {
    it('should return the group where the payment method belongs', async () => {
      groupService.findOne = jest.fn().mockResolvedValue(results.group);
      expect(await resolver.group(paymentMethod1)).toStrictEqual(results.group);
    });
  });

  describe('doctor', () => {
    it('should return the doctor where the payment method belongs', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(results.doctor);
      expect(await resolver.doctor(paymentMethod2)).toStrictEqual(
        results.doctor,
      );
    });
  });

  describe('payments', () => {
    it('should return an array of payments related to the payment method', async () => {
      paymentService.findAll = jest.fn().mockResolvedValue(results.payments);
      expect(await resolver.payments(paymentMethod1)).toStrictEqual(
        results.payments,
      );
    });
  });
});
