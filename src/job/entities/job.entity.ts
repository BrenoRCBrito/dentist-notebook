import { Field, ObjectType } from '@nestjs/graphql';
import {
  client,
  doctor,
  float,
  group,
  int,
  isoDateTime,
  jobType,
  paymentArray,
} from '../../graphql-type-functions/type-functions';
import { Client } from '../../client/entities/client.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';
import { JobType } from '../../job-type/entities/job-type.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class Job {
  @Field(int)
  id: number;
  @Field(isoDateTime)
  createdAt: Date;
  @Field(isoDateTime)
  updatedAt: Date;
  @Field()
  notes: string;
  @Field(float)
  installmentsNumber: number;
  @Field(float)
  installmentValue: number;
  @Field(float)
  paidInstallments: number;
  @Field(jobType)
  jobType: JobType;
  @Field(int)
  jobTypeId: number;
  @Field(group, { nullable: true })
  group: Group;
  @Field(int, { nullable: true })
  groupId: number;
  @Field(doctor)
  doctor: Doctor;
  @Field(int)
  doctorId: number;
  @Field(client)
  client: Client;
  @Field(int)
  clientId: number;
  @Field(paymentArray, { nullable: 'items' })
  payments: Payment[];
}
