import { Field, ObjectType } from '@nestjs/graphql';
import { Client } from '../../client/entities/client.entity';
import {
  clientArray,
  groupArray,
  groupInviteArray,
  int,
  isoDateTime,
  jobArray,
  jobTypeArray,
  paymentArray,
  paymentMethodArray,
} from '../../graphql-type-functions/type-functions';
import { GroupInvite } from '../../group-invite/entities/group-invite.entity';
import { Group } from '../../group/entities/group.entity';
import { JobType } from '../../job-type/entities/job-type.entity';
import { Job } from '../../job/entities/job.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class Doctor {
  @Field(int)
  id: number;
  @Field(isoDateTime)
  createdAt: Date;
  @Field(isoDateTime)
  updatedAt: Date;
  @Field()
  name: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(groupArray, { nullable: 'items' })
  groups: Group[];
  @Field(groupArray, { nullable: 'items' })
  managedGroups: Group[];
  @Field(clientArray, { nullable: 'items' })
  clients: Client[];
  @Field(jobArray, { nullable: 'items' })
  jobs: Job[];
  @Field(paymentMethodArray, { nullable: 'items' })
  paymentMethods: PaymentMethod[];
  @Field(paymentArray, { nullable: 'items' })
  payments: Payment[];
  @Field(jobTypeArray, { nullable: 'items' })
  jobTypes: JobType[];
  @Field(groupInviteArray, { nullable: 'items' })
  groupInvites: GroupInvite[];
}
