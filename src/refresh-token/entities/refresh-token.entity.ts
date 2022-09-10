import { TokenStatus } from '@prisma/client';

export interface RefreshToken {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt: Date;
  token: string;
  status: TokenStatus;
  doctorId: number;
}
