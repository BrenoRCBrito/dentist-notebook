import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { client1 } from '../../mock/clients';
import { doctor2 } from '../../mock/doctor';
import { group1 } from '../../mock/group';
import {
  createJob1Input,
  job1,
  job2,
  updatedJob2,
  updateJob2Input,
} from '../../mock/job';
import { jobType1 } from '../../mock/job-type';
import { payment2 } from '../../mock/payment';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { JobTypeService } from '../job-type/job-type.service';
import { PaymentService } from '../payment/payment.service';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';

const results = {
  create: job1,
  findAll: [job1, job2],
  findOne: job2,
  update: updatedJob2,
  remove: job2,
  client: client1,
  group: group1,
  doctor: doctor2,
  payments: [payment2],
  jobType: jobType1,
};

describe('JobResolver', () => {
  let resolver: JobResolver;
  let service: JobService;
  let jobTypeService: JobTypeService;
  let groupService: GroupService;
  let clientService: ClientService;
  let paymentService: PaymentService;
  let doctorService: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobResolver],
    })
      .useMocker(createMock)
      .compile();

    resolver = module.get<JobResolver>(JobResolver);
    service = module.get<JobService>(JobService);
    jobTypeService = module.get<JobTypeService>(JobTypeService);
    groupService = module.get<GroupService>(GroupService);
    clientService = module.get<ClientService>(ClientService);
    paymentService = module.get<PaymentService>(PaymentService);
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createJob', () => {
    it('should return the created job', async () => {
      service.create = jest.fn().mockResolvedValue(results.create);
      expect(await resolver.createJob(createJob1Input)).toStrictEqual(
        results.create,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      service.findAll = jest.fn().mockResolvedValue(results.findAll);
      expect(await resolver.findAll()).toStrictEqual(results.findAll);
    });
  });

  describe('findOne', () => {
    it('should return a job with the provided id', async () => {
      service.findOne = jest.fn().mockResolvedValue(results.findOne);
      expect(await resolver.findOne(2)).toStrictEqual(results.findOne);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      service.findOne = jest.fn().mockResolvedValue(null);
      expect(await resolver.findOne(null)).toStrictEqual(null);
    });
  });

  describe('updateJob', () => {
    it('should return a job with the provided id and altered data', async () => {
      service.update = jest.fn().mockResolvedValueOnce(results.update);
      expect(await resolver.updateJob(updateJob2Input)).toStrictEqual(
        results.update,
      );
    });
  });

  describe('removeJob', () => {
    it('should return the deleted job with the provided id', async () => {
      service.remove = jest.fn().mockResolvedValue(results.remove);
      expect(await resolver.removeJob(2)).toStrictEqual(results.remove);
    });
  });

  describe('group', () => {
    it('should return the associated group', async () => {
      groupService.findOne = jest.fn().mockResolvedValueOnce(results.group);
      expect(await resolver.group(job1)).toStrictEqual(results.group);
    });
  });

  describe('client', () => {
    it('should return the associated client', async () => {
      clientService.findOne = jest.fn().mockResolvedValue(results.client);
      expect(await resolver.client(job1)).toStrictEqual(results.client);
    });
  });

  describe('payments', () => {
    it('should return an array with payments related to the job', async () => {
      paymentService.findAll = jest
        .fn()
        .mockResolvedValueOnce(results.payments);
      expect(await resolver.payments(job2)).toStrictEqual(results.payments);
    });
  });

  describe('jobType', () => {
    it('should return the job type', async () => {
      jobTypeService.findOne = jest.fn().mockResolvedValueOnce(results.jobType);
      expect(await resolver.jobType(job1)).toStrictEqual(results.jobType);
    });
  });

  describe('doctor', () => {
    it('should return the doctor who did the job', async () => {
      doctorService.findOne = jest.fn().mockResolvedValueOnce(results.doctor);
      expect(await resolver.doctor(job2)).toStrictEqual(results.doctor);
    });
  });
});
