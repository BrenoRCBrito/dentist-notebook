import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { DoctorService } from '../doctor/doctor.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './passport-strategy/access-token.strategy';
import { RefreshTokenStrategy } from './passport-strategy/refresh-token.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthResolver,
    AuthService,
    DoctorService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RefreshTokenService,
    PrismaService,
  ],
})
export class AuthModule {}
