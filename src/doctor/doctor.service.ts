import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  create(createDoctorInput: CreateDoctorInput) {
    return this.prisma.doctor.create({ data: createDoctorInput });
  }

  findAll() {
    return this.prisma.doctor.findMany();
  }

  findOne(id: string) {
    return this.prisma.doctor.findUnique({ where: { id } });
  }

  update(updateDoctorInput: UpdateDoctorInput) {
    return this.prisma.doctor.update({
      where: { id: updateDoctorInput.id },
      data: updateDoctorInput,
    });
  }

  remove(id: string) {
    return this.prisma.doctor.delete({ where: { id } });
  }
}
