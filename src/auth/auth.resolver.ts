import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateDoctorInput } from '../doctor/dto/create-doctor.input';
import { CurrentUserAndToken } from './common/annotation/current-user.annotation';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { Tokens } from './entities/tokens.entity';
import { GqlAccessAuthGuard } from './common/guard/graphql-access.guard';
import { GqlRefreshAuthGuard } from './common/guard/graphql-refresh.guard';
import { JwtPayloadWithToken } from './common/types/jwt-payload.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Tokens, { name: 'signup' })
  signup(@Args('signUpInput') signUpInput: CreateDoctorInput) {
    return this.authService.signup(signUpInput);
  }

  @Mutation(() => Tokens, { name: 'signin' })
  signin(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signin(signInInput);
  }

  @Mutation(() => Tokens)
  @UseGuards(GqlRefreshAuthGuard)
  refreshToken(@CurrentUserAndToken() payload: JwtPayloadWithToken) {
    return this.authService.refreshToken(payload);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAccessAuthGuard)
  logout(@CurrentUserAndToken() payload: JwtPayloadWithToken) {
    return this.authService.logout(payload.user.tokenId);
  }
}
