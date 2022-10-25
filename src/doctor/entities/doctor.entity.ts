import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Client } from '../../client/entities/client.entity';
import { GroupInvite } from '../../group-invite/entities/group-invite.entity';
import { Group } from '../../group/entities/group.entity';
import { JobType } from '../../job-type/entities/job-type.entity';
import { Job } from '../../job/entities/job.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class Doctor {
  @Field(() => Int)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field()
  name: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => [Group], { nullable: 'items' })
  groups: Group[];
  @Field(() => [Group], { nullable: 'items' })
  managedGroups: Group[];
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
  groupInvites: GroupInvite[];
}
