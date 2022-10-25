import { CreateJobTypeInput } from 'src/job-type/dto/create-job-type.input';
import { UpdateJobTypeInput } from 'src/job-type/dto/update-job-type.input';
import { JobType } from 'src/job-type/entities/job-type.entity';
import { doctor2 } from './doctor';
import { group1 } from './group';
import { job1, job2 } from './job';

export const createJobType1Input: CreateJobTypeInput = {
  name: 'Clareamento',
  value: 300,
  doctorId: null,
  groupId: 1,
};

export const updateJobType2Input: UpdateJobTypeInput = {
  id: 2,
  name: 'Obturação',
};

export const jobType1: JobType = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Clareamento',
  doctorId: null,
  groupId: 1,
  value: 300,
  doctor: null,
  group: group1,
  jobs: [job1],
};

export const jobType2: JobType = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Máscara',
  doctorId: 2,
  groupId: null,
  value: 500,
  doctor: doctor2,
  group: null,
  jobs: [job2],
};

export const updatedJobType2: JobType = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Obturação',
  doctorId: 2,
  groupId: null,
  value: 500,
  doctor: doctor2,
  group: null,
  jobs: [job2],
};
