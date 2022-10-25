import { CreateGroupInput } from 'src/group/dto/create-group.input';
import { UpdateGroupInput } from 'src/group/dto/update-group.input';
import { Group } from 'src/group/entities/group.entity';
import { client1 } from './clients';
import { doctor1, doctor2 } from './doctor';
import { groupInvite1, groupInvite2 } from './group-invite';
import { job1 } from './job';
import { jobType1 } from './job-type';
import { payment1 } from './payment';
import { paymentMethod1 } from './payment-method';

export const createGroup1Input: CreateGroupInput = {
  adminId: 1,
  name: 'Sorridente',
};

export const updateGroup2Input: UpdateGroupInput = {
  id: 2,
  name: 'Bright',
};

export const group1: Group = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Sorridente',
  admin: doctor1,
  adminId: 1,
  doctors: [doctor2],
  clients: [client1],
  jobs: [job1],
  paymentMethods: [paymentMethod1],
  payments: [payment1],
  jobTypes: [jobType1],
  invites: [groupInvite1],
};

export const group2: Group = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Sorriso',
  admin: doctor1,
  adminId: 1,
  doctors: [],
  clients: [],
  jobs: [],
  paymentMethods: [],
  payments: [],
  jobTypes: [],
  invites: [groupInvite2],
};

export const updatedGroup2: Group = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Bright',
  admin: doctor1,
  adminId: 1,
  doctors: [],
  clients: [],
  jobs: [],
  paymentMethods: [],
  payments: [],
  jobTypes: [],
  invites: [groupInvite2],
};
