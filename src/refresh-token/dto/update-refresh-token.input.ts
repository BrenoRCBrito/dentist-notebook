import { Prisma, TokenStatus } from '@prisma/client';

export default class UpdateRefreshTokenInput
  implements Prisma.RefreshTokenUncheckedUpdateInput
{
  id: string;
  lastUsedAt?: Date;
  status?: TokenStatus;
}
