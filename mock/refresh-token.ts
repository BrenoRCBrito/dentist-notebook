import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';

export const RefreshToken1UUID = randomUUID();
export const RefreshToken2UUID = randomUUID();

export const createRefreshToken1Input: Prisma.RefreshTokenUncheckedCreateInput =
  {
    id: RefreshToken1UUID,
    token: 'imagineAToken1',
  };

export const updateRefreshToken2Input: Prisma.RefreshTokenUncheckedUpdateManyInput =
  {
    id: RefreshToken2UUID,
    status: 'INVALID',
  };

export const updateManyRefreshToken: Prisma.RefreshTokenUncheckedUpdateManyInput =
  {
    status: 'INVALID',
  };

export const RefreshToken1: RefreshToken = {
  id: RefreshToken1UUID,
  createdAt: new Date(),
  updatedAt: new Date(),
  token: 'imagineAToken1',
  doctorId: 1,
  lastUsedAt: new Date(),
  status: 'VALID',
};

export const RefreshToken2: RefreshToken = {
  id: RefreshToken2UUID,
  createdAt: new Date(),
  updatedAt: new Date(),
  token: 'imagineAToken2',
  doctorId: 1,
  lastUsedAt: new Date(),
  status: 'VALID',
};

export const updatedRefreshToken1: RefreshToken = {
  id: RefreshToken1UUID,
  createdAt: new Date(),
  updatedAt: new Date(),
  token: 'imagineAToken1',
  doctorId: 1,
  lastUsedAt: new Date(),
  status: 'INVALID',
};

export const updatedRefreshToken2: RefreshToken = {
  id: RefreshToken2UUID,
  createdAt: new Date(),
  updatedAt: new Date(),
  token: 'imagineAToken2',
  doctorId: 1,
  lastUsedAt: new Date(),
  status: 'INVALID',
};
