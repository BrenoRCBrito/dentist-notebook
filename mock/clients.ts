import { CreateClientInput } from 'src/client/dto/create-client.input';
import { UpdateClientInput } from 'src/client/dto/update-client.input';
import { Client } from 'src/client/entities/client.entity';
import { doctor2 } from './doctor';
import { group1 } from './group';
import { job1, job2 } from './job';
import { payment1, payment2 } from './payment';

export const createClient1Input: CreateClientInput = {
  name: 'Carlos',
  lastName: 'Magno',
};

export const updateClient2Input: UpdateClientInput = {
  id: 2,
  lastName: 'Faria',
};

export const client1: Client = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Carlos',
  lastName: 'Magno',
  groups: [group1],
  jobs: [job1],
  payments: [payment1],
  doctors: [],
};

export const client2: Client = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Sandra',
  lastName: 'Lima',
  groups: [],
  jobs: [job2],
  payments: [payment2],
  doctors: [doctor2],
};

export const updatedClient2: Client = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Sandra',
  lastName: 'Faria',
  groups: [],
  jobs: [job2],
  payments: [payment2],
  doctors: [doctor2],
};
