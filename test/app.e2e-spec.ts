import { getApolloServer } from '@nestjs/apollo';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerBase, gql } from 'apollo-server-core';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let apolloServer: ApolloServerBase<any>;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    apolloServer = getApolloServer(app);
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('signUp', () => {
    const signUpMutation = gql`
      mutation Mutation($signUpInput: SignUpInput!) {
        signup(signUpInput: $signUpInput) {
          access
          refresh
        }
      }
    `;

    it("should return an error object if there isn't an input", async () => {
      const signUpResponse = await apolloServer.executeOperation({
        query: signUpMutation,
      });
      expect(signUpResponse).toHaveProperty('errors');
      expect(signUpResponse.errors).toContainEqual({
        message:
          'Variable "$signUpInput" of required type "SignUpInput!" was not provided.',
        locations: [{ line: 1, column: 19 }],
        extensions: { code: 'BAD_USER_INPUT' },
      });
    });

    it('should return an error object if input fields are empty', async () => {
      const signUpResponse = await apolloServer.executeOperation({
        query: signUpMutation,
        variables: {
          signUpInput: {},
        },
      });
      expect(signUpResponse).toHaveProperty('errors');
      expect(signUpResponse.errors).toContainEqual({
        message: 'Bad Request Exception',
        extensions: {
          code: 'BAD_USER_INPUT',
          response: {
            statusCode: 400,
            message: [
              'name must contain only letters (a-zA-Z)',
              'name should not be empty',
              'lastName must contain only letters (a-zA-Z)',
              'lastName should not be empty',
              'email must be an email',
              'email should not be empty',
              'password must be longer than or equal to 8 characters',
              'password must be a string',
              'password should not be empty',
            ],
            error: 'Bad Request',
          },
        },
      });
    });

    it('should return an error object if input fields are not alpha', async () => {
      const signUpResponse = await apolloServer.executeOperation({
        query: signUpMutation,
        variables: {
          signUpInput: {
            name: '1',
            lastName: '1',
            email: '1',
            password: '1',
          },
        },
      });
      expect(signUpResponse).toHaveProperty('errors');
      expect(signUpResponse.errors).toContainEqual({
        message: 'Bad Request Exception',
        extensions: {
          code: 'BAD_USER_INPUT',
          response: {
            statusCode: 400,
            message: [
              'name must contain only letters (a-zA-Z)',
              'lastName must contain only letters (a-zA-Z)',
              'email must be an email',
              'password must be longer than or equal to 8 characters',
            ],
            error: 'Bad Request',
          },
        },
      });
    });

    it('should return an error object if email field is not an email', async () => {
      const signUpResponse = await apolloServer.executeOperation({
        query: signUpMutation,
        variables: {
          signUpInput: {
            name: 'John',
            lastName: 'Doe',
            email: '1',
            password: 'password',
          },
        },
      });
      expect(signUpResponse).toHaveProperty('errors');
      expect(signUpResponse.errors).toContainEqual({
        message: 'Bad Request Exception',
        extensions: {
          code: 'BAD_USER_INPUT',
          response: {
            statusCode: 400,
            message: ['email must be an email'],
            error: 'Bad Request',
          },
        },
      });
    });

    it('should return an error object if password is less than 8 characters', async () => {
      const signUpResponse = await apolloServer.executeOperation({
        query: signUpMutation,
        variables: {
          signUpInput: {
            name: 'John',
            lastName: 'Doe',
            email: 'test@test.com',
            password: '123456',
          },
        },
      });
      expect(signUpResponse).toHaveProperty('errors');
      expect(signUpResponse.errors).toContainEqual({
        message: 'Bad Request Exception',
        extensions: {
          code: 'BAD_USER_INPUT',
          response: {
            statusCode: 400,
            message: ['password must be longer than or equal to 8 characters'],
            error: 'Bad Request',
          },
        },
      });
    });

    it('should return an access and a refresh token', async () => {
      await prismaService.doctor
        .findMany()
        .then((data) =>
          expect(
            data.some(
              (doctor) => doctor.name === 'John' && doctor.lastName === 'Doe',
            ),
          ).toBe(false),
        );
      const signUpResponse = await apolloServer.executeOperation({
        query: signUpMutation,
        variables: {
          signUpInput: {
            name: 'John',
            lastName: 'Doe',
            email: 'test@test.com',
            password: 'password',
          },
        },
      });
      expect(signUpResponse).toHaveProperty('data');
      expect(signUpResponse.data).toHaveProperty('signup');
      expect(signUpResponse.data.signup).toHaveProperty('access');
      expect(signUpResponse.data.signup).toHaveProperty('refresh');
      expect(signUpResponse.data.signup.access.length).toBe(236);
      expect(signUpResponse.data.signup.refresh.length).toBe(236);
    });

    it('must have saved the doctor and token in the database', async () => {
      let doctorId: number;
      await prismaService.doctor.findMany().then((data) => {
        const doctor = data.find(
          (doctor) => doctor.name === 'John' && doctor.lastName === 'Doe',
        );
        doctorId = doctor.id;
        return expect(doctor).toBeDefined();
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      await prismaService.refreshToken
        .findMany()
        .then((data) =>
          expect(data.some((data) => data.doctorId === doctorId)).toBe(true),
        );
    });

    it('should return an error object if the same user try to sign up again', async () => {
      const signUpResponse = await apolloServer.executeOperation({
        query: signUpMutation,
        variables: {
          signUpInput: {
            name: 'John',
            lastName: 'Doe',
            email: 'test@test.com',
            password: 'password',
          },
        },
      });
      expect(signUpResponse).toHaveProperty('errors');
      expect(signUpResponse.errors).toContainEqual({
        message: 'Doctor already exists',
        extensions: {
          code: 'BAD_USER_INPUT',
          response: {
            statusCode: 400,
            message: 'Doctor already exists',
            error: 'Bad Request',
          },
        },
      });
    });
  });
});
