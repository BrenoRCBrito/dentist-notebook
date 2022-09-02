import { Injectable } from '@nestjs/common';
import mapManyToManyUpdateInput from '../utils/mapManyToManyUpdateInput';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDoctorInput: CreateDoctorInput) {
    return this.prisma.doctor.create({ data: createDoctorInput });
  }

  findAll() {
    return this.prisma.doctor.findMany();
  }

  findAllByClient(clientId: number) {
    return this.prisma.doctor.findMany({
      where: {
        clients: {
          some: {
            id: clientId,
          },
        },
      },
    });
  }

  findGroupAdmin(adminId: number) {
    return this.prisma.doctor.findUnique({ where: { id: adminId } });
  }

  findAllByGroup(groupId: number) {
    return this.prisma.doctor.findMany({
      where: { groups: { some: { id: groupId } } },
    });
  }

  findOne(id: number) {
    return this.prisma.doctor.findUnique({ where: { id } });
  }

  findOneByInvite(doctorId: number) {
    return this.prisma.doctor.findUnique({ where: { id: doctorId } });
  }

  update(id: number, updateDoctorInput: UpdateDoctorInput) {
    let checkedInput;
    if (
      Array.isArray(updateDoctorInput.groups) &&
      updateDoctorInput.groups.length > 0
    ) {
      checkedInput = mapManyToManyUpdateInput(updateDoctorInput);
    } else checkedInput = updateDoctorInput;
    return this.prisma.doctor.update({
      where: { id },
      data: checkedInput,
    });
  }

  remove(id: number) {
    return this.prisma.doctor.delete({ where: { id } });
  }
}
