import { Field, ObjectType } from '@nestjs/graphql';
import { Client } from '../../client/entities/client.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import {
  client,
  doctor,
  float,
  group,
  int,
  isoDateTime,
  job,
  paymentMethod,
} from '../../graphql-type-functions/type-functions';
import { Group } from '../../group/entities/group.entity';
import { Job } from '../../job/entities/job.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';

@ObjectType()
export class Payment {
  @Field(int)
  id: number;
  @Field(isoDateTime)
  createdAt: Date;
  @Field(isoDateTime)
  updatedAt: Date;
  @Field(float)
  value: number;
  @Field(paymentMethod)
  method: PaymentMethod;
  @Field(int)
  paymentMethodId: number;
  @Field(group, { nullable: true })
  group: Group;
  @Field(int, { nullable: true })
  groupId: number;
  @Field(doctor, { nullable: true })
  doctor: Doctor;
  @Field(int, { nullable: true })
  doctorId: number;
  @Field(client)
  client: Client;
  @Field(int)
  clientId: number;
  @Field(job)
  job: Job;
  @Field(int)
  jobId: number;
}
