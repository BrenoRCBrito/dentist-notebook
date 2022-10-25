import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { client1 } from '../../mock/clients';
import { doctor1, doctor2 } from '../../mock/doctor';
import { groupInvite1 } from '../../mock/group-invite';
import { job1 } from '../../mock/job';
import { jobType1 } from '../../mock/job-type';
import { payment1 } from '../../mock/payment';
import { paymentMethod1 } from '../../mock/payment-method';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import { GroupInviteService } from '../group-invite/group-invite.service';
import { JobTypeService } from '../job-type/job-type.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentService } from '../payment/payment.service';
import {
  createGroup1Input,
  group1,
  group2,
  updatedGroup2,
  updateGroup2Input,
} from '../../mock/group';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

const results = {
  create: group1,
  findAll: [group1, group2],
  findOne: group2,
  update: updatedGroup2,
  remove: group2,
  admin: doctor1,
  doctors: [doctor2],
  clients: [client1],
  jobs: [job1],
  paymentMethods: [paymentMethod1],
  payments: [payment1],
  jobTypes: [jobType1],
  invites: [groupInvite1],
};

describe('GroupResolver', () => {
  let resolver: GroupResolver;
  let service: GroupService;
  let doctorService: DoctorService;
  let clientService: ClientService;
  let jobService: JobService;
  let paymentService: PaymentService;
  let paymentMethodService: PaymentMethodService;
  let jobTypeService: JobTypeService;
  let groupInviteService: GroupInviteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupResolver],
    })
      .useMocker(createMock)
      .compile();

    resolver = module.get<GroupResolver>(GroupResolver);
    service = module.get<GroupService>(GroupService);
    doctorService = module.get<DoctorService>(DoctorService);
    clientService = module.get<ClientService>(ClientService);
    jobService = module.get<JobService>(JobService);
    paymentService = module.get<PaymentService>(PaymentService);
    paymentMethodService =
      module.get<PaymentMethodService>(PaymentMethodService);
    jobTypeService = module.get<JobTypeService>(JobTypeService);
    groupInviteService = module.get<GroupInviteService>(GroupInviteService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createGroup', () => {
    it('should return the created group', async () => {
      service.create = jest.fn().mockResolvedValue(results.create);
      expect(await resolver.createGroup(createGroup1Input)).toStrictEqual(
        results.create,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      service.findAll = jest.fn().mockResolvedValue(results.findAll);
      expect(await resolver.findAll()).toStrictEqual(results.findAll);
    });
  });

  describe('findOne', () => {
    it('should return a group with the provided id', async () => {
      service.findOne = jest.fn().mockResolvedValue(results.findOne);
      expect(await resolver.findOne(2)).toStrictEqual(results.findOne);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      service.findOne = jest.fn().mockResolvedValue(null);
      expect(await resolver.findOne(null)).toStrictEqual(null);
    });
  });

  describe('updateGroup', () => {
    it('should return a group with the provided id and altered data', async () => {
      service.update = jest.fn().mockResolvedValueOnce(results.update);
      expect(await resolver.updateGroup(updateGroup2Input)).toStrictEqual(
        results.update,
      );
    });
  });

  describe('removeGroup', () => {
    it('should return the deleted group with the provided id', async () => {
      service.remove = jest.fn().mockResolvedValue(results.remove);
      expect(await resolver.removeGroup(2)).toStrictEqual(results.remove);
    });
  });

  describe('admin', () => {
    it('should return the group administrator', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(results.admin);
      expect(await resolver.admin(group1)).toStrictEqual(results.admin);
    });
  });

  describe('doctors', () => {
    it('should return all the doctors that are members of the group', async () => {
      doctorService.findAll = jest.fn().mockResolvedValue(results.doctors);
      expect(await resolver.doctors(group1)).toStrictEqual(results.doctors);
    });
  });

  describe('clients', () => {
    it('should return an array with the associated clients', async () => {
      clientService.findAll = jest.fn().mockResolvedValue(results.clients);
      expect(await resolver.clients(group1)).toStrictEqual(results.clients);
    });
  });

  describe('jobs', () => {
    it('should return an array with jobs that the group made', async () => {
      jobService.findAll = jest.fn().mockResolvedValueOnce(results.jobs);
      expect(await resolver.jobs(group1)).toStrictEqual(results.jobs);
    });
  });

  describe('paymentMethods', () => {
    it('should return an array with paymentMethods that the group has available', async () => {
      paymentMethodService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.paymentMethods);
      expect(await resolver.paymentMethods(group1)).toStrictEqual(
        results.paymentMethods,
      );
    });
  });

  describe('payments', () => {
    it('should return an array with payments that the group received', async () => {
      paymentService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.payments);
      expect(await resolver.payments(group1)).toStrictEqual(results.payments);
    });
  });

  describe('jobTypes', () => {
    it('should return an array with jobTypes that the group provides', async () => {
      jobTypeService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.jobTypes);
      expect(await resolver.jobTypes(group1)).toStrictEqual(results.jobTypes);
    });
  });

  describe('invites', () => {
    it('should return an array with invites to enter the group', async () => {
      groupInviteService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.invites);
      expect(await resolver.invites(group1)).toStrictEqual(results.invites);
    });
  });
});
