import { Field, ObjectType } from '@nestjs/graphql';
import { Doctor } from '../../doctor/entities/doctor.entity';
import {
  groupArray,
  int,
  isoDateTime,
  jobArray,
  paymentArray,
} from '../../graphql-type-functions/type-functions';
import { Group } from '../../group/entities/group.entity';
import { Job } from '../../job/entities/job.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class Client {
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
  @Field(groupArray, { nullable: 'itemsAndList' })
  groups: Group[];
  @Field(groupArray, { nullable: 'itemsAndList' })
  doctors: Doctor[];
  @Field(jobArray, { nullable: 'items' })
  jobs: Job[];
  @Field(paymentArray, { nullable: 'items' })
  payments: Payment[];
}
