import { Injectable } from '@nestjs/common';
import { CreateGroupInviteInput } from './dto/create-group-invite.input';
import { UpdateGroupInviteInput } from './dto/update-group-invite.input';

@Injectable()
export class GroupInviteService {
  create(createGroupInviteInput: CreateGroupInviteInput) {
    return 'This action adds a new groupInvite';
  }

  findAll() {
    return `This action returns all groupInvite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupInvite`;
  }

  update(id: number, updateGroupInviteInput: UpdateGroupInviteInput) {
    return `This action updates a #${id} groupInvite`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupInvite`;
  }
}
