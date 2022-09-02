import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGroupInput: CreateGroupInput) {
    return this.prisma.group.create({ data: createGroupInput });
  }

  findAll() {
    return this.prisma.group.findMany();
  }

  findAllByAdmin(adminId: number) {
    return this.prisma.group.findMany({
      where: { adminId },
    });
  }

  findAllByDoctor(doctorId: number) {
    return this.prisma.group.findMany({
      where: { doctors: { some: { id: doctorId } } },
    });
  }

  findAllByClient(clientId: number) {
    return this.prisma.group.findMany({
      where: {
        clients: {
          some: {
            id: clientId,
          },
        },
      },
    });
  }

  findOne(id: number) {
    if (id === null) return null;
    return this.prisma.group.findUnique({ where: { id } });
  }

  findOneByInvite(groupId: number) {
    return this.prisma.group.findUnique({ where: { id: groupId } });
  }

  update(id: number, updateGroupInput: UpdateGroupInput) {
    return this.prisma.group.update({ where: { id }, data: updateGroupInput });
  }

  remove(id: number) {
    return this.prisma.group.delete({ where: { id } });
  }
}
