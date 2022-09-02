import {
  ObjectType,
  Field,
  Int,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Client } from '../../client/entities/client.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';
import { Job } from '../../job/entities/job.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';

@ObjectType()
export class Payment {
  @Field(() => Int)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field(() => Float)
  value: number;
  @Field(() => PaymentMethod)
  method: PaymentMethod;
  @Field(() => Int)
  paymentMethodId: number;
  @Field(() => Group, { nullable: true })
  group: Group;
  @Field(() => Int, { nullable: true })
  groupId: number;
  @Field(() => Doctor, { nullable: true })
  doctor: Doctor;
  @Field(() => Int, { nullable: true })
  doctorId: number;
  @Field(() => Client)
  client: Client;
  @Field(() => Int)
  clientId: number;
  @Field(() => Job)
  job: Job;
  @Field(() => Int)
  jobId: number;
}
