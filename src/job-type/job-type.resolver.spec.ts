import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { doctor2 } from '../../mock/doctor';
import { DoctorService } from '../doctor/doctor.service';
import { group1 } from '../../mock/group';
import { job1 } from '../../mock/job';
import {
  createJobType1Input,
  jobType1,
  jobType2,
  updatedJobType2,
  updateJobType2Input,
} from '../../mock/job-type';
import { GroupService } from '../../src/group/group.service';
import { JobService } from '../../src/job/job.service';
import { JobTypeResolver } from './job-type.resolver';
import { JobTypeService } from './job-type.service';

const results = {
  create: jobType1,
  findAll: [jobType1, jobType2],
  findOne: jobType2,
  update: updatedJobType2,
  remove: jobType2,
  group: group1,
  jobs: [job1],
  doctor: doctor2,
};

describe('JobTypeResolver', () => {
  let resolver: JobTypeResolver;
  let service: JobTypeService;
  let groupService: GroupService;
  let jobService: JobService;
  let doctorService: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobTypeResolver, JobTypeService],
    })
      .useMocker(createMock)
      .compile();

    resolver = module.get<JobTypeResolver>(JobTypeResolver);
    service = module.get<JobTypeService>(JobTypeService);
    groupService = module.get<GroupService>(GroupService);
    jobService = module.get<JobService>(JobService);
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createJobType', () => {
    it('should return the created jobType', async () => {
      service.create = jest.fn().mockResolvedValue(results.create);
      expect(await resolver.createJobType(createJobType1Input)).toStrictEqual(
        results.create,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of jobTypes', async () => {
      service.findAll = jest.fn().mockResolvedValue(results.findAll);
      expect(await resolver.findAll()).toStrictEqual(results.findAll);
    });
  });

  describe('findOne', () => {
    it('should return a jobType with the provided id', async () => {
      service.findOne = jest.fn().mockResolvedValue(results.findOne);
      expect(await resolver.findOne(2)).toStrictEqual(results.findOne);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      service.findOne = jest.fn().mockResolvedValue(null);
      expect(await resolver.findOne(null)).toStrictEqual(null);
    });
  });

  describe('updateJobType', () => {
    it('should return a jobType with the provided id and altered data', async () => {
      service.update = jest.fn().mockResolvedValueOnce(results.update);
      expect(await resolver.updateJobType(updateJobType2Input)).toStrictEqual(
        results.update,
      );
    });
  });

  describe('removeJobType', () => {
    it('should return the deleted jobType with the provided id', async () => {
      service.remove = jest.fn().mockResolvedValue(results.remove);
      expect(await resolver.removeJobType(2)).toStrictEqual(results.remove);
    });
  });

  describe('group', () => {
    it('should return the group where the jobType belongs', async () => {
      groupService.findOne = jest.fn().mockResolvedValueOnce(results.group);
      expect(await resolver.group(jobType1)).toStrictEqual(results.group);
    });
  });

  describe('doctor', () => {
    it('should return the doctor where the jobType belongs ', async () => {
      doctorService.findOne = jest.fn().mockResolvedValueOnce(results.doctor);
      expect(await resolver.doctor(jobType2)).toStrictEqual(results.doctor);
    });
  });

  describe('jobs', () => {
    it('should return an array with jobs that corresponds to the jobType', async () => {
      jobService.findAll = jest.fn().mockResolvedValueOnce(results.jobs);
      expect(await resolver.jobs(jobType1)).toStrictEqual(results.jobs);
    });
  });
});
