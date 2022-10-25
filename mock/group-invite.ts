import { CreateGroupInviteInput } from 'src/group-invite/dto/create-group-invite.input';
import { UpdateGroupInviteInput } from 'src/group-invite/dto/update-group-invite.input';
import { GroupInvite } from 'src/group-invite/entities/group-invite.entity';
import { doctor2 } from './doctor';
import { group1, group2 } from './group';

export const createGroupInvite1Input: CreateGroupInviteInput = {
  doctorId: 2,
  groupId: 1,
  message: '',
};

export const updateGroupInvite2Input: UpdateGroupInviteInput = {
  id: 2,
  status: 'REJECTED',
};

export const groupInvite1: GroupInvite = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  doctor: doctor2,
  doctorId: 2,
  group: group1,
  groupId: 1,
  message: '',
  status: 'ACCEPTED',
};

export const groupInvite2: GroupInvite = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  doctor: doctor2,
  doctorId: 2,
  group: group2,
  groupId: 2,
  message: '',
  status: 'WAITING',
};

export const updatedGroupInvite2: GroupInvite = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  doctor: doctor2,
  doctorId: 2,
  group: group2,
  groupId: 2,
  message: '',
  status: 'REJECTED',
};
