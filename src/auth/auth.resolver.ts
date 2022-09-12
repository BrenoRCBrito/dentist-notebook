import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUserAndToken } from './common/annotation/current-user.annotation';
import { GqlAccessAuthGuard } from './common/guard/graphql-access.guard';
import { GqlRefreshAuthGuard } from './common/guard/graphql-refresh.guard';
import { JwtPayloadWithToken } from './common/types/jwt-payload.type';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { Tokens } from './entities/tokens.entity';

@Resolver(() => Tokens)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Tokens, { name: 'signup' })
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
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
