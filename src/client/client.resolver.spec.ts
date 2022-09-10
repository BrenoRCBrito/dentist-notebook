import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { doctor2 } from '../../mock/doctor';
import { group1 } from '../../mock/group';
import { job2 } from '../../mock/job';
import { payment2 } from '../../mock/payment';
import { GroupService } from '../group/group.service';
import {
  client1,
  client2,
  createClient1Input,
  createClient2Input,
  updateClient2Input,
  updatedClient2,
} from '../../mock/clients';
import { DoctorService } from '../doctor/doctor.service';
import { JobService } from '../job/job.service';
import { PaymentService } from '../payment/payment.service';
import { ClientResolver } from './client.resolver';
import { ClientService } from './client.service';

const results = {
  createClient: { first: client1, second: client2 },
  findAll: [client1, client2],
  findOne: client2,
  update: updatedClient2,
  remove: client2,
  groups: [group1],
  jobs: [job2],
  payments: [payment2],
  doctors: [doctor2],
};

describe('ClientResolver', () => {
  let resolver: ClientResolver;
  let service: ClientService;
  let jobService: JobService;
  let paymentService: PaymentService;
  let doctorService: DoctorService;
  let groupService: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientResolver],
    })
      .useMocker(createMock)
      .compile();

    resolver = module.get<ClientResolver>(ClientResolver);
    service = module.get<ClientService>(ClientService);
    jobService = module.get<JobService>(JobService);
    paymentService = module.get<PaymentService>(PaymentService);
    doctorService = module.get<DoctorService>(DoctorService);
    groupService = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createClient', () => {
    it('should return the created client', async () => {
      service.create = jest.fn().mockResolvedValue(results.createClient.first);
      expect(await resolver.createClient(createClient1Input)).toStrictEqual(
        results.createClient.first,
      );
    });

    it('a connection array should not disrupt the create functionality', async () => {
      service.create = jest.fn().mockResolvedValue(results.createClient.second);
      expect(await resolver.createClient(createClient2Input)).toStrictEqual(
        results.createClient.second,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      service.findAll = jest.fn().mockResolvedValue(results.findAll);
      expect(await resolver.findAll()).toStrictEqual(results.findAll);
    });
  });

  describe('findOne', () => {
    it('should return a client with the provided id', async () => {
      service.findOne = jest.fn().mockResolvedValue(results.findOne);
      expect(await resolver.findOne(2)).toStrictEqual(results.findOne);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      service.findOne = jest.fn().mockResolvedValue(null);
      expect(await resolver.findOne(null)).toStrictEqual(null);
    });
  });

  describe('updateClient', () => {
    it('should return a client with the provided id and altered data', async () => {
      service.update = jest.fn().mockResolvedValueOnce(results.update);
      expect(await resolver.updateClient(updateClient2Input)).toStrictEqual(
        results.update,
      );
    });
  });

  describe('removeclient', () => {
    it('should return the deleted client with the provided id', async () => {
      service.remove = jest.fn().mockResolvedValue(results.remove);
      expect(await resolver.removeClient(2)).toStrictEqual(results.remove);
    });
  });

  describe('groups', () => {
    it('should return an array with groups that the client is a member', async () => {
      groupService.findAll = jest.fn().mockResolvedValueOnce(results.groups);
      expect(await resolver.groups(client1)).toStrictEqual(results.groups);
    });
  });

  describe('jobs', () => {
    it('should return an array with jobs that the client requested', async () => {
      jobService.findAll = jest.fn().mockResolvedValueOnce(results.jobs);
      expect(await resolver.jobs(client2)).toStrictEqual(results.jobs);
    });
  });

  describe('payments', () => {
    it('should return an array with payments that the client made', async () => {
      paymentService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.payments);
      expect(await resolver.payments(client2)).toStrictEqual(results.payments);
    });
  });

  describe('doctor', () => {
    it('should return an array with doctor that the client is related to', async () => {
      doctorService.findAll = jest.fn().mockResolvedValueOnce(results.doctors);
      expect(await resolver.doctors(client2)).toStrictEqual(results.doctors);
    });
  });
});
