import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { client1 } from '../../mock/clients';
import {
  createDoctor1Input,
  doctor1,
  doctor2,
  updated2Doctor2,
  updatedDoctor2,
  updateDoctor2Input,
  updateDoctor2Input2,
} from '../../mock/doctor';
import { group1, group2 } from '../../mock/group';
import { groupInvite1, groupInvite2 } from '../../mock/group-invite';
import { job2 } from '../../mock/job';
import { jobType2 } from '../../mock/job-type';
import { payment2 } from '../../mock/payment';
import { paymentMethod2 } from '../../mock/payment-method';
import { ClientService } from '../client/client.service';
import { GroupInviteService } from '../group-invite/group-invite.service';
import { GroupService } from '../group/group.service';
import { JobTypeService } from '../job-type/job-type.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentService } from '../payment/payment.service';
import { DoctorResolver } from './doctor.resolver';
import { DoctorService } from './doctor.service';

const results = {
  create: doctor1,
  findAll: [doctor1, doctor2],
  findOne: doctor2,
  updateDoctor: { first: updatedDoctor2, second: updated2Doctor2 },
  removeDoctor: doctor2,
  clients: [client1],
  managedGroups: [group1, group2],
  groups: [group1],
  jobs: [job2],
  paymentMethods: [paymentMethod2],
  payments: [payment2],
  jobTypes: [jobType2],
  groupInvites: [groupInvite1, groupInvite2],
};

describe('DoctorResolver', () => {
  let resolver: DoctorResolver;
  let service: DoctorService;
  let groupService: GroupService;
  let clientService: ClientService;
  let jobService: JobService;
  let paymentMethodService: PaymentMethodService;
  let paymentService: PaymentService;
  let jobTypeService: JobTypeService;
  let groupInviteService: GroupInviteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorResolver],
    })
      .useMocker(createMock)
      .compile();
    resolver = module.get<DoctorResolver>(DoctorResolver);
    service = module.get<DoctorService>(DoctorService);
    groupService = module.get<GroupService>(GroupService);
    clientService = module.get<ClientService>(ClientService);
    jobService = module.get<JobService>(JobService);
    paymentMethodService =
      module.get<PaymentMethodService>(PaymentMethodService);
    paymentService = module.get<PaymentService>(PaymentService);
    jobTypeService = module.get<JobTypeService>(JobTypeService);
    groupInviteService = module.get<GroupInviteService>(GroupInviteService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createDoctor', () => {
    it('should return the created doctor ', async () => {
      service.create = jest.fn().mockResolvedValue(results.create);
      expect(await resolver.createDoctor(createDoctor1Input)).toStrictEqual(
        results.create,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      service.findAll = jest.fn().mockResolvedValue(results.findAll);
      expect(await resolver.findAll()).toStrictEqual(results.findAll);
    });
  });

  describe('findOne', () => {
    it('should return a doctor with the provided id', async () => {
      service.findOne = jest.fn().mockResolvedValue(results.findOne);
      expect(await resolver.findOne(2)).toStrictEqual(results.findOne);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      service.findOne = jest.fn().mockResolvedValue(null);
      expect(await resolver.findOne(null)).toStrictEqual(null);
    });
  });

  describe('updateDoctor', () => {
    it('should return a doctor with the provided id and altered data', async () => {
      service.update = jest
        .fn()
        .mockResolvedValueOnce(results.updateDoctor.first);
      expect(await resolver.updateDoctor(updateDoctor2Input)).toStrictEqual(
        results.updateDoctor.first,
      );
    });

    it('', async () => {
      service.update = jest.fn().mockResolvedValue(results.updateDoctor.second);
      expect(await resolver.updateDoctor(updateDoctor2Input2)).toStrictEqual(
        results.updateDoctor.second,
      );
    });
  });

  describe('removeDoctor', () => {
    it('should return the deleted doctor with the provided id', async () => {
      service.remove = jest.fn().mockResolvedValue(results.removeDoctor);
      expect(await resolver.removeDoctor(2)).toStrictEqual(
        results.removeDoctor,
      );
    });
  });

  describe('clients', () => {
    it('should return an array with the associated clients', async () => {
      clientService.findAll = jest.fn().mockResolvedValue(results.clients);
      expect(await resolver.clients(doctor1)).toStrictEqual(results.clients);
    });
  });

  describe('managedGroups', () => {
    it('should return an array with groups managed by the given doctor', async () => {
      groupService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.managedGroups);
      expect(await resolver.managedGroups(doctor1)).toStrictEqual(
        results.managedGroups,
      );
    });
  });

  describe('groups', () => {
    it('should return an array with groups that the doctor is a member', async () => {
      groupService.findAll = jest.fn().mockResolvedValueOnce(results.groups);
      expect(await resolver.groups(doctor2)).toStrictEqual(results.groups);
    });
  });

  describe('jobs', () => {
    it('should return an array with jobs that the doctor did', async () => {
      jobService.findAll = jest.fn().mockResolvedValueOnce(results.jobs);
      expect(await resolver.jobs(doctor2)).toStrictEqual(results.jobs);
    });
  });

  describe('paymentMethods', () => {
    it('should return an array with paymentMethods that the doctor has available', async () => {
      paymentMethodService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.paymentMethods);
      expect(await resolver.paymentMethods(doctor2)).toStrictEqual(
        results.paymentMethods,
      );
    });
  });

  describe('payments', () => {
    it('should return an array with payments that the doctor received', async () => {
      paymentService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.payments);
      expect(await resolver.payments(doctor2)).toStrictEqual(results.payments);
    });
  });

  describe('jobTypes', () => {
    it('should return an array with jobTypes that the doctor can do', async () => {
      jobTypeService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.jobTypes);
      expect(await resolver.jobTypes(doctor2)).toStrictEqual(results.jobTypes);
    });
  });

  describe('groupInvites', () => {
    it('should return an array with groupInvites that the doctor received', async () => {
      groupInviteService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.groupInvites);
      expect(await resolver.groupInvites(doctor2)).toStrictEqual(
        results.groupInvites,
      );
    });
  });
});
