import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { DoctorModule } from './doctor/doctor.module';
import { GroupInviteModule } from './group-invite/group-invite.module';
import { GroupModule } from './group/group.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JobModule } from './job/job.module';
import { PaymentModule } from './payment/payment.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql', ...scalarTypeDefs],
    }),
    AuthModule,
    GroupModule,
    DoctorModule,
    GroupInviteModule,
    ClientModule,
    JobModule,
    JobTypeModule,
    PaymentModule,
  ],
})
export class AppModule {}
