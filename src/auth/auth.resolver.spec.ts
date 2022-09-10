import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { doctor1 } from '../../mock/doctor';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

const tokensMock = {
  access: 'imaginaAnAccessToken',
  refresh: 'imaginaAnRefreshToken',
};

const inputs = {
  signup: {
    name: doctor1.name,
    lastName: doctor1.lastName,
    email: doctor1.email,
    password: doctor1.password,
  },
  signin: {
    email: doctor1.email,
    password: doctor1.password,
  },
  refreshToken: {
    user: {
      sub: 1,
      email: 'test@email.com',
      iat: 2,
      exp: 3,
      tokenId: 'someTokenId',
    },
    authorization: 'someToken',
  },
  logout: {
    user: {
      sub: 1,
      email: 'test@email.com',
      iat: 2,
      exp: 3,
      tokenId: 'someTokenId',
    },
    authorization: 'someToken',
  },
};

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver],
    })
      .useMocker(createMock)
      .compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signup', () => {
    it('should return the access and refresh token', async () => {
      service.signup = jest.fn().mockResolvedValue(tokensMock);
      expect(await resolver.signup(inputs.signup)).toStrictEqual(tokensMock);
    });
  });

  describe('signin', () => {
    it('should return the access and refresh token', async () => {
      service.signin = jest.fn().mockResolvedValue(tokensMock);
      expect(await resolver.signin(inputs.signin)).toStrictEqual(tokensMock);
    });
  });

  describe('refreshToken', () => {
    it('should return the access and refresh token', async () => {
      service.refreshToken = jest.fn().mockResolvedValue(tokensMock);
      expect(await resolver.refreshToken(inputs.refreshToken)).toStrictEqual(
        tokensMock,
      );
    });
  });

  describe('logout', () => {
    it('should return a boolean of the logout result', async () => {
      service.logout = jest.fn().mockResolvedValue(true);
      expect(await resolver.logout(inputs.logout)).toStrictEqual(true);
    });
  });
});
