import { createMock } from '@golevelup/ts-jest';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { doctor1 } from '../../mock/doctor';
import { RefreshToken1, RefreshToken1UUID } from '../../mock/refresh-token';
import { DoctorService } from '../doctor/doctor.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { AuthService } from './auth.service';
import crypto = require('crypto');
import argon2 = require('argon2');

describe('AuthService', () => {
  let service: AuthService;
  let refreshTokenService: RefreshTokenService;
  let jwtService: JwtService;
  let doctorService: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<AuthService>(AuthService);
    refreshTokenService = module.get<RefreshTokenService>(RefreshTokenService);
    jwtService = module.get<JwtService>(JwtService);
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('if the doctor does  exist should throw a badRequestException', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(doctor1);
      try {
        await service.signup({
          name: doctor1.name,
          lastName: doctor1.lastName,
          email: doctor1.email,
          password: doctor1.password,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('if not goes wrong should return the access and refresh tokens', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(null);
      service.signTokens = jest.fn().mockResolvedValueOnce({
        access: 'imaginaAnAccessToken',
        refresh: 'imaginaAnRefreshToken',
        uuid: crypto.randomUUID(),
      });
      expect(
        await service.signup({
          name: doctor1.name,
          lastName: doctor1.lastName,
          email: doctor1.email,
          password: doctor1.password,
        }),
      ).toStrictEqual({
        access: 'imaginaAnAccessToken',
        refresh: 'imaginaAnRefreshToken',
      });
    });
  });

  describe('signin', () => {
    it('if the doctor does not exist should throw a forbiddenException', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(null);
      try {
        await service.signin({
          email: doctor1.email,
          password: doctor1.password,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      }
    });

    it('if the password does not match throw a forbiddenException', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(doctor1);
      argon2.verify = jest.fn().mockResolvedValue(false);
      try {
        await service.signin({
          email: doctor1.email,
          password: doctor1.password,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      }
    });

    it('if not goes wrong should return the access and refresh tokens', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(doctor1);
      argon2.verify = jest.fn().mockResolvedValue(true);
      service.signTokens = jest.fn().mockResolvedValueOnce({
        access: 'imaginaAnAccessToken',
        refresh: 'imaginaAnRefreshToken',
        uuid: crypto.randomUUID(),
      });
      expect(
        await service.signin({
          email: doctor1.email,
          password: doctor1.password,
        }),
      ).toStrictEqual({
        access: 'imaginaAnAccessToken',
        refresh: 'imaginaAnRefreshToken',
      });
    });
  });

  describe('refreshToken', () => {
    it('if there is no payload should throw forbiddenException', async () => {
      try {
        await service.refreshToken(null);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('if there is not a token owner should throw an forbiddenException', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(null);
      try {
        await service.refreshToken({
          user: {
            sub: 1,
            email: 'test@email.com',
            iat: 2,
            exp: 3,
            tokenId: 'someTokenId',
          },
          authorization: 'someToken',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      }
    });

    it('if token does not match, should throw forbiddenException', async () => {
      refreshTokenService.findOne = jest.fn().mockResolvedValue(RefreshToken1);
      argon2.verify = jest.fn().mockResolvedValue(false);
      try {
        await service.refreshToken({
          user: {
            sub: 1,
            email: 'test@email.com',
            iat: 2,
            exp: 3,
            tokenId: 'someTokenId',
          },
          authorization: 'someToken',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      }
    });

    it('if nothing wrong happens, should return the access and refresh tokens', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(doctor1);
      refreshTokenService.findOne = jest.fn().mockResolvedValue(RefreshToken1);
      argon2.verify = jest.fn().mockResolvedValue(true);
      service.signTokens = jest.fn().mockResolvedValueOnce({
        access: 'imaginaAnAccessToken',
        refresh: 'imaginaAnRefreshToken',
        uuid: crypto.randomUUID(),
      });
      expect(
        await service.refreshToken({
          user: {
            sub: 1,
            email: 'test@email.com',
            iat: 2,
            exp: 3,
            tokenId: 'someTokenId',
          },
          authorization: 'someToken',
        }),
      ).toStrictEqual({
        access: 'imaginaAnAccessToken',
        refresh: 'imaginaAnRefreshToken',
      });
    });
  });

  describe('logout', () => {
    it('should delete the refresh token from the database and return true', async () => {
      refreshTokenService.remove = jest.fn().mockResolvedValue(null);
      expect(await service.logout('imagineATokenId')).toStrictEqual(true);
    });

    it('if the delete function does not return null, the function should return false', async () => {
      refreshTokenService.remove = jest.fn().mockResolvedValue('anything');
      expect(await service.logout('imagineATokenId')).toStrictEqual(false);
    });
  });

  describe('signTokens', () => {
    it('should create and return an access token and a refresh token', async () => {
      crypto.randomUUID = jest.fn().mockReturnValue('imagineAUUID');
      jwtService.signAsync = jest.fn().mockImplementation(
        (_obj1, obj2) =>
          new Promise((resolve) => {
            if (obj2.expiresIn === '7d') resolve('imaginaAnRefreshToken');
            resolve('imaginaAnAccessToken');
          }),
      );
      expect(await service.signTokens(1, doctor1.email)).toStrictEqual({
        access: 'imaginaAnAccessToken',
        refresh: 'imaginaAnRefreshToken',
        uuid: 'imagineAUUID',
      });
    });
  });

  describe('saveRefreshToken', () => {
    it('should hash the token and save it', async () => {
      argon2.hash = jest.fn().mockResolvedValue('imagineAToken');
      await service.saveRefreshToken(
        RefreshToken1UUID,
        1,
        'imagineAUnHashedToken',
      );
      expect(refreshTokenService.create).toBeCalledTimes(1);
    });
  });

  describe('checkTokenValidity', () => {
    it('if token is invalid should turn all other tokens invalid and throw ForbiddenException', async () => {
      try {
        await service.checkTokenValidity('INVALID');
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      }
      expect(refreshTokenService.updateMany).toBeCalledTimes(1);
      expect(refreshTokenService.updateMany).toBeCalledWith({
        where: { status: 'VALID' },
        data: { status: 'INVALID' },
      });
    });

    it('if token is valid should thow nothing', async () => {
      expect(await service.checkTokenValidity('VALID')).toStrictEqual(
        undefined,
      );
      expect(refreshTokenService.updateMany).toBeCalledTimes(0);
    });
  });

  describe('invalidateToken', () => {
    it('should call refreshTokenService.update one time to invalidate the token', async () => {
      await service.invalidateToken(RefreshToken1UUID);
      expect(refreshTokenService.update).toBeCalledTimes(1);
      expect(refreshTokenService.update).toBeCalledWith({
        where: { id: RefreshToken1UUID },
        data: { status: 'INVALID' },
      });
    });
  });
});
