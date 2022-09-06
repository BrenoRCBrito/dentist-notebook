import { Prisma } from '@prisma/client';

export default class CreateRefreshTokenInput
  implements Prisma.RefreshTokenCreateManyInput
{
  id: string;
  token: string;
  doctorId?: number;
}
