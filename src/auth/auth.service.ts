import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { DoctorService } from '../doctor/doctor.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { JwtPayloadWithToken } from './common/types/jwt-payload.type';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import argon2 = require('argon2');
import { TokenStatus } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async signup(signUpInput: SignUpInput) {
    const registeringDoctor = await this.doctorService.findOne({
      where: { email: signUpInput.email },
    });
    if (registeringDoctor !== null)
      throw new BadRequestException(`Doctor already exists`);
    const hashedPassword: string = await argon2.hash(signUpInput.password);
    const newDoctor = await this.doctorService.create({
      data: {
        name: signUpInput.name,
        lastName: signUpInput.lastName,
        email: signUpInput.email,
        password: hashedPassword,
      },
    });
    const { access, refresh, uuid } = await this.signTokens(
      newDoctor.id,
      newDoctor.email,
    );
    this.saveRefreshToken(uuid, newDoctor.id, refresh);
    return { access, refresh };
  }

  async signin(signInInput: SignInInput) {
    const loggingDoctor = await this.doctorService.findOne({
      where: { email: signInInput.email },
    });
    if (loggingDoctor === null) {
      throw new ForbiddenException(`Doctor doesn't exist`);
    }
    const { id: doctorId, email, password } = loggingDoctor;
    const passwordMatches = await argon2.verify(password, signInInput.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');
    const { access, refresh, uuid } = await this.signTokens(doctorId, email);
    await this.saveRefreshToken(uuid, doctorId, refresh);
    return { access, refresh };
  }

  async refreshToken(payload: JwtPayloadWithToken) {
    if (!payload) throw new BadRequestException('No token was found');
    const tokenOwner = await this.doctorService.findOne({
      where: { email: payload.user.email },
    });
    if (tokenOwner === null) {
      throw new ForbiddenException(`Doctor doesn't exist`);
    }
    const { id: doctorId } = tokenOwner;
    const dbRefreshToken = await this.refreshTokenService.findOne({
      where: {
        id: payload.user.tokenId,
      },
    });
    await this.checkTokenValidity(dbRefreshToken.status);
    const { token: tokenHash } = dbRefreshToken;
    const tokenMatches = await argon2.verify(tokenHash, payload.authorization);
    if (!tokenMatches) throw new ForbiddenException(`Token doesn't match`);
    await this.invalidateToken(payload.user.tokenId);
    const { access, refresh, uuid } = await this.signTokens(
      doctorId,
      payload.user.email,
    );
    await this.saveRefreshToken(uuid, doctorId, refresh);
    return { access, refresh };
  }

  async logout(tokenId: string) {
    const deletedToken = await this.refreshTokenService.remove({
      where: { id: tokenId },
    });
    if (deletedToken === null) {
      return true;
    }
    return false;
  }

  async signTokens(userId: number, email: string) {
    const refreshTokenId = randomUUID();
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(
        {
          tokenId: refreshTokenId,
          sub: userId,
          email,
        },
        { expiresIn: '1m', secret: 'secret' },
      ),
      this.jwtService.signAsync(
        {
          tokenId: refreshTokenId,
          sub: userId,
          email,
        },
        // time in seconds
        { expiresIn: '7d', secret: 'refreshedSecret' },
      ),
    ]);
    return { access, refresh, uuid: refreshTokenId };
  }

  async saveRefreshToken(uuid: string, doctorId: number, token: string) {
    const hashedtoken: string = await argon2.hash(token);
    await this.refreshTokenService.create({
      data: { id: uuid, token: hashedtoken, doctorId },
    });
  }

  async checkTokenValidity(tokenStatus: TokenStatus) {
    if (tokenStatus === 'INVALID') {
      await this.refreshTokenService.updateMany({
        where: { status: 'VALID' },
        data: { status: 'INVALID' },
      });
      throw new ForbiddenException('Token is invalid');
    }
  }

  async invalidateToken(tokenId: string) {
    await this.refreshTokenService.update({
      where: { id: tokenId },
      data: { status: 'INVALID' },
    });
  }
}
