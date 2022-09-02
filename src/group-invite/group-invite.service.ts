import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupInviteInput } from './dto/create-group-invite.input';
import { UpdateGroupInviteInput } from './dto/update-group-invite.input';

@Injectable()
export class GroupInviteService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGroupInviteInput: CreateGroupInviteInput) {
    return this.prisma.groupInvite.create({ data: createGroupInviteInput });
  }

  findAll() {
    return this.prisma.groupInvite.findMany();
  }

  findAllByDoctor(doctorId: number) {
    return this.prisma.groupInvite.findMany({
      where: { doctorId },
    });
  }

  findAllByGroup(groupId: number) {
    return this.prisma.groupInvite.findMany({
      where: { groupId },
    });
  }

  findOne(id: number) {
    return this.prisma.groupInvite.findUnique({ where: { id } });
  }

  update(id: number, updateGroupInviteInput: UpdateGroupInviteInput) {
    return this.prisma.groupInvite.update({
      where: { id },
      data: updateGroupInviteInput,
    });
  }

  remove(id: number) {
    return this.prisma.groupInvite.delete({ where: { id } });
  }
}
