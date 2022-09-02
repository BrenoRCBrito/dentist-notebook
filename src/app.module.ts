import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { DoctorModule } from './doctor/doctor.module';
import { GroupInviteModule } from './group-invite/group-invite.module';
import { GroupModule } from './group/group.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JobModule } from './job/job.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    GroupModule,
    DoctorModule,
    GroupInviteModule,
    ClientModule,
    JobModule,
    JobTypeModule,
    PaymentModule,
    PaymentMethodModule,
  ],
})
export class AppModule {}
