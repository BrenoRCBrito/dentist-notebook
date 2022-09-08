import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Client } from '../../client/entities/client.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { GroupInvite } from '../../group-invite/entities/group-invite.entity';
import { JobType } from '../../job-type/entities/job-type.entity';
import { Job } from '../../job/entities/job.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class Group {
  @Field(() => Int)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt;
  @Field()
  name: string;
  @Field(() => Doctor)
  admin: Doctor;
  @Field(() => Int)
  adminId: number;
  @Field(() => [Doctor], { nullable: 'items' })
  doctors: Doctor[];
  @Field(() => [Client], { nullable: 'items' })
  clients: Client[];
  @Field(() => [Job], { nullable: 'items' })
  jobs: Job[];
  @Field(() => [PaymentMethod], { nullable: 'items' })
  paymentMethods: PaymentMethod[];
  @Field(() => [Payment], { nullable: 'items' })
  payments: Payment[];
  @Field(() => [JobType], { nullable: 'items' })
  jobTypes: JobType[];
  @Field(() => [GroupInvite], { nullable: 'items' })
  invites: GroupInvite[];
}
