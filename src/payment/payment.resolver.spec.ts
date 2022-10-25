import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { client1 } from '../../mock/clients';
import { doctor2 } from '../../mock/doctor';
import { group1 } from '../../mock/group';
import { job1 } from '../../mock/job';
import {
  createPayment1Input,
  payment1,
  payment2,
  updatedPayment2,
  updatePayment2Input,
} from '../../mock/payment';
import { paymentMethod1 } from '../../mock/payment-method';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

const results = {
  create: payment1,
  findAll: [payment1, payment2],
  findOne: payment2,
  update: updatedPayment2,
  remove: payment2,
  method: paymentMethod1,
  group: group1,
  doctor: doctor2,
  client: client1,
  job: job1,
};

describe('PaymentResolver', () => {
  let resolver: PaymentResolver;
  let service: PaymentService;
  let paymentMethodService: PaymentMethodService;
  let groupService: GroupService;
  let doctorService: DoctorService;
  let clientService: ClientService;
  let jobService: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentResolver],
    })
      .useMocker(createMock)
      .compile();

    resolver = module.get<PaymentResolver>(PaymentResolver);
    service = module.get<PaymentService>(PaymentService);
    paymentMethodService =
      module.get<PaymentMethodService>(PaymentMethodService);
    groupService = module.get<GroupService>(GroupService);
    doctorService = module.get<DoctorService>(DoctorService);
    clientService = module.get<ClientService>(ClientService);
    jobService = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createPayment', () => {
    it('should return the created payment', async () => {
      service.create = jest.fn().mockResolvedValue(results.create);
      expect(await resolver.createPayment(createPayment1Input)).toStrictEqual(
        results.create,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      service.findAll = jest.fn().mockResolvedValue(results.findAll);
      expect(await resolver.findAll()).toStrictEqual(results.findAll);
    });
  });

  describe('findOne', () => {
    it('should return a payment with the provided id', async () => {
      service.findOne = jest.fn().mockResolvedValue(results.findOne);
      expect(await resolver.findOne(2)).toStrictEqual(results.findOne);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      service.findOne = jest.fn().mockResolvedValue(null);
      expect(await resolver.findOne(null)).toStrictEqual(null);
    });
  });

  describe('updatePayment', () => {
    it('should return a payment with the provided id and altered data', async () => {
      service.update = jest.fn().mockResolvedValueOnce(results.update);
      expect(await resolver.updatePayment(updatePayment2Input)).toStrictEqual(
        results.update,
      );
    });
  });

  describe('removePayment', () => {
    it('should return the deleted payment with the provided id', async () => {
      service.remove = jest.fn().mockResolvedValue(results.remove);
      expect(await resolver.removePayment(2)).toStrictEqual(results.remove);
    });
  });

  describe('method', () => {
    it('should return the payment method', async () => {
      paymentMethodService.findOne = jest
        .fn()
        .mockResolvedValue(results.method);
      expect(await resolver.method(payment1)).toStrictEqual(results.method);
    });
  });

  describe('group', () => {
    it('should return the group where the payment is related to', async () => {
      groupService.findOne = jest.fn().mockResolvedValue(results.group);
      expect(await resolver.group(payment1)).toStrictEqual(results.group);
    });
  });

  describe('doctor', () => {
    it('should return the doctor where the payment is related to', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(results.doctor);
      expect(await resolver.doctor(payment2)).toStrictEqual(results.doctor);
    });
  });

  describe('client', () => {
    it('should return the client where the payment is related to', async () => {
      clientService.findOne = jest.fn().mockResolvedValue(results.client);
      expect(await resolver.client(payment1)).toStrictEqual(results.client);
    });
  });

  describe('job', () => {
    it('should return the job where the payment is related to', async () => {
      jobService.findOne = jest.fn().mockResolvedValue(results.job);
      expect(await resolver.job(payment1)).toStrictEqual(results.job);
    });
  });
});
