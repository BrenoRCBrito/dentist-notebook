import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  create(createJobInput: CreateJobInput) {
    return this.prisma.job.create({ data: createJobInput });
  }

  findAll() {
    return this.prisma.job.findMany();
  }

  findAllByClient(clientId: number) {
    return this.prisma.job.findMany({
      where: {
        clientId,
      },
    });
  }

  findAllByDoctor(doctorId: number) {
    return this.prisma.job.findMany({
      where: { doctorId },
    });
  }

  findAllByGroup(groupId: number) {
    return this.prisma.job.findMany({
      where: { groupId },
    });
  }

  findAllByJobType(jobTypeId: number) {
    return this.prisma.job.findMany({
      where: { jobTypeId },
    });
  }

  findOne(id: number) {
    return this.prisma.job.findUnique({ where: { id } });
  }

  update(id: number, updateJobInput: UpdateJobInput) {
    return this.prisma.job.update({ where: { id }, data: updateJobInput });
  }

  remove(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }
}
