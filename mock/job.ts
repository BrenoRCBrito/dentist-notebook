import { CreateJobInput } from 'src/job/dto/create-job.input';
import { UpdateJobInput } from 'src/job/dto/update-job.input';
import { Job } from 'src/job/entities/job.entity';
import { client1, client2 } from './clients';
import { doctor2 } from './doctor';
import { group1 } from './group';
import { jobType1, jobType2 } from './job-type';
import { payment2 } from './payment';

export const createJob1Input: CreateJobInput = {
  notes: '',
  installmentValue: 100,
  installmentsNumber: 3,
  paidInstallments: 0,
  clientId: 1,
  doctorId: null,
  groupId: 1,
  jobTypeId: 1,
};

export const updateJob2Input: UpdateJobInput = {
  id: 2,
  paidInstallments: 1,
};

export const job1: Job = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  notes: '',
  installmentValue: 100,
  installmentsNumber: 3,
  paidInstallments: 0,
  client: client1,
  clientId: 1,
  doctor: null,
  doctorId: null,
  group: group1,
  groupId: 1,
  jobType: jobType1,
  jobTypeId: 1,
  payments: [],
};

export const job2: Job = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  notes: '',
  installmentValue: 100,
  installmentsNumber: 5,
  paidInstallments: 0,
  client: client2,
  clientId: 2,
  doctor: doctor2,
  doctorId: 2,
  group: null,
  groupId: null,
  jobType: jobType2,
  jobTypeId: 2,
  payments: [payment2],
};

export const updatedJob2: Job = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  notes: '',
  installmentValue: 100,
  installmentsNumber: 5,
  paidInstallments: 1,
  client: client2,
  clientId: 2,
  doctor: doctor2,
  doctorId: 2,
  group: null,
  groupId: null,
  jobType: jobType2,
  jobTypeId: 2,
  payments: [payment2],
};
