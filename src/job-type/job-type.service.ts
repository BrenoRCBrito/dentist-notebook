import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobTypeInput } from './dto/create-job-type.input';
import { UpdateJobTypeInput } from './dto/update-job-type.input';

@Injectable()
export class JobTypeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createJobTypeInput: CreateJobTypeInput) {
    return this.prisma.jobType.create({ data: createJobTypeInput });
  }

  findAll() {
    return this.prisma.jobType.findMany();
  }

  findAllByDoctor(doctorId: number) {
    return this.prisma.jobType.findMany({
      where: { doctorId },
    });
  }

  findAllByGroup(groupId: number) {
    return this.prisma.jobType.findMany({
      where: { groupId },
    });
  }

  findOne(id: number) {
    return this.prisma.jobType.findUnique({ where: { id } });
  }

  update(id: number, updateJobTypeInput: UpdateJobTypeInput) {
    return this.prisma.jobType.update({
      where: { id },
      data: updateJobTypeInput,
    });
  }

  remove(id: number) {
    return this.prisma.jobType.delete({ where: { id } });
  }
}
