import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Client } from '../../client/entities/client.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';
import { JobType } from '../../job-type/entities/job-type.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class Job {
  @Field(() => Int)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field()
  notes: string;
  @Field(() => Float)
  installmentsNumber: number;
  @Field(() => Float)
  installmentValue: number;
  @Field(() => Float)
  paidInstallments: number;
  @Field(() => JobType)
  jobType: JobType;
  @Field(() => Int)
  jobTypeId: number;
  @Field(() => Group, { nullable: true })
  group: Group;
  @Field(() => Int, { nullable: true })
  groupId: number;
  @Field(() => Doctor)
  doctor: Doctor;
  @Field(() => Int)
  doctorId: number;
  @Field(() => Client)
  client: Client;
  @Field(() => Int)
  clientId: number;
  @Field(() => [Payment], { nullable: 'items' })
  payments: Payment[];
}
