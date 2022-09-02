import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClientInput: CreateClientInput) {
    return this.prisma.client.create({ data: createClientInput });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  findAllByDoctor(doctorId: number) {
    return this.prisma.client.findMany({
      where: {
        doctors: {
          some: {
            id: doctorId,
          },
        },
      },
    });
  }

  findAllByGroup(groupId: number) {
    return this.prisma.client.findMany({
      where: {
        groups: {
          some: {
            id: groupId,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.client.findUnique({ where: { id } });
  }

  update(id: number, updateClientInput: UpdateClientInput) {
    return this.prisma.client.update({
      where: { id },
      data: updateClientInput,
    });
  }

  remove(id: number) {
    return this.prisma.client.delete({ where: { id } });
  }
}
