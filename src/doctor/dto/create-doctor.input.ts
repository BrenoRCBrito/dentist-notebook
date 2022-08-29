import { Prisma, Role } from '@prisma/client';

export class CreateDoctorInput implements Prisma.DoctorCreateInput {
  name: string;
  lastName: string;
  role?: Role;
}
