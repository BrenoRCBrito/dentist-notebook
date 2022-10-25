import { CreateDoctorInput } from 'src/doctor/dto/create-doctor.input';
import { UpdateDoctorInput } from 'src/doctor/dto/update-doctor.input';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { client2 } from './clients';
import { group1, group2 } from './group';
import { groupInvite1, groupInvite2 } from './group-invite';
import { job2 } from './job';
import { jobType1 } from './job-type';
import { payment2 } from './payment';
import { paymentMethod2 } from './payment-method';

export const createDoctor1Input: CreateDoctorInput = {
  name: 'Eduardo',
  lastName: 'Ramos',
  email: 'eduardo@gmail.com',
  password: 'password',
};

export const updateDoctor2Input: UpdateDoctorInput = {
  id: 2,
  email: 'marianafernandes@gmaiil.com',
  groups: [2],
};

export const updateDoctor2Input2: UpdateDoctorInput = {
  id: 2,
  email: 'marianafernandes@gmaiil.com',
};

export const doctor1: Doctor = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Eduardo',
  lastName: 'Ramos',
  email: 'eduardo@gmail.com',
  password: 'password',
  groups: [],
  managedGroups: [group1, group2],
  clients: [],
  jobs: [],
  paymentMethods: [],
  payments: [],
  jobTypes: [],
  groupInvites: [],
};

export const doctor2: Doctor = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Mariana',
  lastName: 'Fernandes',
  email: 'mariana@gmail.com',
  password: 'password',
  groups: [group1],
  managedGroups: [],
  clients: [client2],
  jobs: [job2],
  paymentMethods: [paymentMethod2],
  payments: [payment2],
  jobTypes: [jobType1],
  groupInvites: [groupInvite1, groupInvite2],
};

export const updatedDoctor2: Doctor = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Mariana',
  lastName: 'Fernandes',
  email: 'mariana@gmail.com',
  password: 'password',
  groups: [group1, group2],
  managedGroups: [],
  clients: [client2],
  jobs: [job2],
  paymentMethods: [paymentMethod2],
  payments: [payment2],
  jobTypes: [jobType1],
  groupInvites: [groupInvite1, groupInvite2],
};

export const updated2Doctor2: Doctor = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Mariana',
  lastName: 'Fernandes',
  email: 'marianafernandes@gmaiil.com',
  password: 'password',
  groups: [group1, group2],
  managedGroups: [],
  clients: [client2],
  jobs: [job2],
  paymentMethods: [paymentMethod2],
  payments: [payment2],
  jobTypes: [jobType1],
  groupInvites: [groupInvite1, groupInvite2],
};
