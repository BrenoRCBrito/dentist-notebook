import { Prisma, Role } from '@prisma/client';

export class UpdateDoctorInput implements Prisma.DoctorUpdateInput {
  id: string;
  name: string;
  lastName: string;
  role?: Role;
}
