import { Field, ObjectType } from '@nestjs/graphql';
import { Client } from '../../client/entities/client.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import {
  clientArray,
  doctor,
  doctorArray,
  groupInviteArray,
  int,
  isoDateTime,
  jobArray,
  jobTypeArray,
  paymentArray,
  paymentMethodArray,
} from '../../graphql-type-functions/type-functions';
import { GroupInvite } from '../../group-invite/entities/group-invite.entity';
import { JobType } from '../../job-type/entities/job-type.entity';
import { Job } from '../../job/entities/job.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class Group {
  @Field(int)
  id: number;
  @Field(isoDateTime)
  createdAt: Date;
  @Field(isoDateTime)
  updatedAt;
  @Field()
  name: string;
  @Field(doctor)
  admin: Doctor;
  @Field(int)
  adminId: number;
  @Field(doctorArray, { nullable: 'items' })
  doctors: Doctor[];
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
  invites: GroupInvite[];
}
